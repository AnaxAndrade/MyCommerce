

export async function all(){
    // Dados primeiro Fornecedor
    const f1 = await fetch("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider");
    const dadosF1 = await f1.json();

    return dadosF1.map(x => transform(x));
}

export async function single(id){
    const f = await fetch(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${id}`);
    const p = await f.json();
    return transform(p);
}

function transform(item){
    return {
        nome: item.nome,
        descricao: item.descricao,
        categoria: item.categoria,
        imagem: item.imagem,
        preco: item.preco,
        material: item.material,
        departamento: item.departamento,
        id: `1-${item.id}`
    };
}