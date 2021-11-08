import {all as supplier1, single as single1} from './integrations/supplier1';
import {all as supplier2, single as single2} from './integrations/supplier2';
import {MongoClient} from 'mongodb';

/* Cada "Adapter" de obter produtos fornecedor tem de retornar a mesma estrutura 
    [
        {
            nome: "",
            descricao: "",
            categoria: "",
            imagem: "",
            preco: "",
            material: "",
            departamento: "",
            id: "",
        }
    ]
*/

// Lista de produtos ordenados aleatoriamente
export async function allRandom(){
    const all = await loadAll();

    // Juntar e retornar
    return all.sort((a, b) => 0.5 - Math.random());
}

// Obter dados ordenados por nome de produto
export async function allByName(){
    const all = await loadAll();
    // Ordenar e 
    return all.sort((a, b) => {
        let fa = a.nome.toLowerCase();
        let fb = b.nome.toLowerCase();

        return fa < fb ? -1 : (fa > fb ? 1 : 0);
    });
}

// Apenas id dos produtos
export async function allIds(){
    const all = await loadAll();
    return all.map(x => x.id);
}

// Obter dados de um produto a partir do ID
export async function getById(productId)
{
    // Load a partir do BD
    const client = await MongoClient.connect(process.env.MONGO_CONNECTION);
    try{
        const db = client.db();
        const result = await db.collection('produtos').findOne({id: productId});
        client.close();
        if (result){
            return result;
        }
    }
    catch(err)
    {
        client.close();
    }

    /* 
        //LOAD DIRETO DA API DO FORNECEDOR
        let prod = productId.split('-');

        if (prod[0] == '1') return single1(prod[1]);

        if (prod[0] == '2') return single2(prod[1]);
    */
    return null;
}

// BASE, para carregar dados de todos os fornecedores
async function loadAll(){

    const client = await MongoClient.connect(process.env.MONGO_CONNECTION);
    try{

        // Tentar carregar da DB (MongoDB)
        const db = client.db();
        const result = await db.collection('produtos').find().toArray();
        if (result.countDocuments > 0) { // caso tiver produtos na DB
            client.close();
            return result;
        }
        else { // Se não tiver produtos na DB
        
            // Carregar das API dos fornecedores
            const loaders = [supplier1(), supplier2()];
            const allLoad = await Promise.all(loaders);
            const res = allLoad.reduce((acc, e) => acc.concat(e), []);

            // Armazenar em MongoDB
            const saveAll = await db.collection('produtos').insertMany(res);
            client.close();
            // Retornar
            return res;
        }   
    }
    catch(err)
    {
        console.log(err);
        client.close();
        return null;
    }
}
