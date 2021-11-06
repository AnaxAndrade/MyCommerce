import {all as supplier1, single as single1} from './integrations/supplier1';
import {all as supplier2, single as single2} from './integrations/supplier2';

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
    let prod = productId.split('-');

    if (prod[0] == '1') return single1(prod[1]);

    if (prod[0] == '2') return single2(prod[1]);

    return null;
}

// BASE, para carregar dados de todos os fornecedores
async function loadAll(){
    const loaders = [supplier1(), supplier2()];
    // Dados primeiro Fornecedor
    
    const allLoad = await Promise.all(loaders);
    return allLoad.reduce((acc, e) => acc.concat(e), []);;
}
