import Image from 'next/image';

export default function Carrinho({items, isEmpty, removeItem, updateItemQuantity}) {
    
      
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
                                            <td>R$ {item.preco}</td>
                                            <td>
                                                <button  className="btn btn-sm btn-outline-secondary" onClick={() => updateItemQuantity(item.id, item.quantity-1)}>-</button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => updateItemQuantity(item.id, item.quantity+1)}>+</button></td>
                                            <td>{item.itemTotal}</td>
                                            <td><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>X</button></td>
                                        </tr>
                                       );
                                })}
                                {isEmpty && <tr><td colSpan="6"><p className="text-center">Sem itens no carrinho!</p></td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}