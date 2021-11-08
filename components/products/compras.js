import Image from 'next/image';
import { Accordion } from 'react-bootstrap';

export default function Compras({items}){
    if (!items)
    {
        return <p></p>;
    }
    return (
        
        <Accordion>
            {items.map(item => 
                (<Accordion.Item eventKey={item._id} key={item._id}>
                    <Accordion.Header>
                        <p>
                            <small><b>Compra:</b> #{item._id}</small>
                            <span className="mx-4"><b>Total:</b> R$ {item.total}</span>
                            <span className="mx-4"><b>Data:</b> {(new Date(item.data)).toLocaleString()}</span>
                        </p>                       
                    </ Accordion.Header>
                    <Accordion.Body>
                    <table className="table table-borderless table-sm">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="justify-content-center">
                                { item.produtos.map((sub) => {
                                       return ( <tr key={sub.id}>
                                            <td>
                                                <Image src={sub.imagem} width={45} height={45}></Image>
                                            </td>
                                            <td>{sub.nome}</td>
                                            <td>R$ {sub.preco}</td>
                                            <td><span className="mx-2">{sub.quantity}</span></td>
                                            <td>R$ {sub.itemTotal}</td>
                                        </tr>
                                       );
                                })}
                            </tbody>
                        </table>
                    </Accordion.Body>
                </Accordion.Item>)
                )
            }
        </Accordion>
    );
}