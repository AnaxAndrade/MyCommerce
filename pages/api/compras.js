
import { getSession } from 'next-auth/client';
import { comprasUser } from '../../lib/repository';

export default async function handler(req, res) {

    //if (req.method === 'POST') {
    const session = await getSession({ req });
    if (session){
        // Registar venda para o user com req.body (= itens)
        const re = await comprasUser(session.user.email);
        if (re)
            res.status(200).json(re);
        else
            res.status(500).json({status: false, message: "Erro ao obter compras!"});

    }
    else
        res.status(401).json({status: false, message: "Não autenticado"});

    /*} else {
        res.status(405).json({ status: false, message: 'Método não suportado' });
    }*/
}