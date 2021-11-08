import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {
    
    if (req.method === 'POST') {
        // Obter dados vindos do formulário
        const { name, email, password } = req.body;
        //Validar
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Dados inválidos' });
            return;
        }
        //Connect with database
        const client = await MongoClient.connect(
           process.env.MONGO_CONNECTION,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();
        //Verificar se utilizador já existe
        const checkExisting = await db
            .collection('utilizadores')
            .findOne({ email: email });
            
        if (checkExisting) {
            res.status(422).json({ status: false, message: 'Utilizador já existe!' });
            client.close();
            return;
        }
        //Inserir com Hash password
        const status = await db.collection('utilizadores').insertOne({
            name,
            email,
            password: await hash(password, 12),
        });
        
        res.status(201).json({ status: true, message: 'Utilizador criado!', ...status });
        //Close DB connection
        client.close();
    } else {
        res.status(405).json({ status: false, message: 'Método não suportado' });
    }
}

export default handler;