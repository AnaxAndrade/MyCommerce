

export default async function fetchProducts(){
    // Dados primeiro Fornecedor
    const f1 = await fetch("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider");
    const dadosF1 = await f1.json();

    return transform(dadosF1);
}


function transform(dados){
    const arr = dados.map(item => ({
        nome: item.nome,
        descricao: item.descricao,
        categoria: item.categoria,
        imagem: item.imagem,
        preco: item.preco,
        material: item.material,
        departamento: item.departamento,
        id: `1-${item.id}`
    }));
    return arr;
}