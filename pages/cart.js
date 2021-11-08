import Layout from "../components/base/Layout";
import Carrinho from "../components/products/carrinho";
import Link from 'next/link';
import {useRouter} from "next/router";
import { useCart } from "react-use-cart";


export default function Cart(){
    const route = useRouter();

      const {
        isEmpty,
        items,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
      } = useCart();

    return (
        <Layout>
            <main>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row my-2">
                            <div className="col-2">
                                <Link href="/shop">
                                    <a className="btn-linkless"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> 
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg> Ir para a loja
                                    </a>
                                </Link>
                            </div>
                            <div className="col-10">
                                <h6 className="float-end">{totalUniqueItems > 0 ? (totalUniqueItems != 1 ? `${totalUniqueItems} itens` : " 1 item") : "" }, Total: R$ {cartTotal}</h6>
                            </div>
                        </div>
                        <Carrinho isEmpty={isEmpty} items={items} updateItemQuantity={updateItemQuantity} removeItem={removeItem} />
                        <div className="row my-2">
                            <div className="col-12">
                                <button type="button" className="btn btn-primary float-end">Finalizar Compra</button>
                                <button type="button" className="btn btn-outline-primary float-end mx-2" onClick={() => route.push("/shop")}>Comprar mais itens</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}