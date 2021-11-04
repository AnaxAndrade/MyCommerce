import supplier1 from './supplier1';
import supplier2 from './supplier2';

export default async function fetchProducts(){
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

    // Dados primeiro Fornecedor
    const f1 = await supplier1();
    
    // Segundo Fornecedor
    const f2 = await supplier2();

    let all = f1.concat(f2);

    // Juntar e retornar
    return all.sort((a, b) => 0.5 - Math.random());
}