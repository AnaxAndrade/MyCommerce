import Image from 'next/image';

export default function Carrinho(props) {
    const items = [
        {
          nome: "Ergonomic Fresh Bacon",
          descricao: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
          categoria: "Generic",
          imagem: "http://placeimg.com/640/480/animals",
          preco: "174.00",
          material: "Concrete",
          departamento: "Garden",
          quantidade: 1,
          total: 174,
          id: "1-28"
        },
        {
          nome: "Awesome Frozen Soap",
          descricao: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
          categoria: "Small",
          imagem: "http://placeimg.com/640/480/transport",
          preco: "404.00",
          material: "Rubber",
          departamento: "",
          quantidade: 1,
          total: 808,
          id: "2-36"
        }];

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Total</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody className="justify-content-center">
                                { items.map((item) => {
                                       return ( <tr key={item.id}>
                                            <td>
                                                <Image src={item.imagem} width={90} height={90}></Image>
                                            </td>
                                            <td>{item.nome}</td>
                                            <td>{item.preco}</td>
                                            <td><button  className="btn btn-sm btn-outline-secondary">-</button> {item.quantidade} <button className="btn btn-sm btn-outline-secondary">+</button></td>
                                            <td>{item.total}</td>
                                            <td><button type="button" className="btn btn-sm btn-outline-danger">X</button></td>
                                        </tr>
                                       );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}