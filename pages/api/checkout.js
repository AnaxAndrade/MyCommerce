
import { getSession } from 'next-auth/client';
import { registarCompra } from '../../lib/repository';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const session = await getSession({ req });
        console.log(req.body);
        if (session){
            // Registar venda para o user com req.body (= itens)
            const re = await registarCompra(req.body.items, req.body.total, session.user.email);
            if (re)
                res.status(201).json({status: true, message: "Compra efetuada com sucesso!"});
            else
                res.status(500).json({status: false, message: "Erro ao registar compra!"});

        }
        else
            res.status(401).json({status: false, message: "Não autenticado"});

    } else {
        res.status(405).json({ status: false, message: 'Método não suportado' });
    }
}