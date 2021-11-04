

export async function all(){

    // Segundo Fornecedor
    const f2 = await fetch("http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider");
    const dadosF2 = await f2.json();
    return dadosF2.map(x => transform(x));
}

export async function single(id){
    const f = await fetch(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${id}`);
    const p = await f.json();
    return transform(p);
}

function transform(item){
    return {
        nome: item.name,
        descricao: item.description,
        categoria: item.details.adjective,
        imagem: item.gallery[0],
        preco: item.price,
        material: item.details.material,
        departamento: "",
        id: `2-${item.id}`
    };
}