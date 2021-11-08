import Layout from "../components/base/Layout";
import Carrinho from "../components/products/carrinho";
import Link from 'next/link';
import router, {useRouter} from "next/router";
import { useCart } from "react-use-cart";
import Head from 'next/head';
import { useSession } from "next-auth/client";
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';


export default function Cart(){
    const route = useRouter();
    const [session, loading] = useSession();
    const [isLoading, setIsLoading] = useState(false);

      const {
        isEmpty,
        items,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
      } = useCart();

      async function checkout()
      {
        // não autenticado => login
        if (!session)
        {
            toast.info(`Tem de entrar para finalizar compra!`,  { theme: "colored" });
            route.push("/login?return=/cart");
        }
        else{
            // autenticado => Registar compra do user
            // call api endpoint
            setIsLoading(true);
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total: cartTotal,
                    items
                }),
            });
            const j = await res.json();
            setIsLoading(false);
            if (j.status)
            {
                toast.success(`Compra efetuada com sucesso!`,  { theme: "colored" });
                // Limpar carrinho
                emptyCart();
                router.push("/account");
            }
            else{
                toast.error(`Erro ao efetuar compra: ${j.message}!`,  { theme: "colored" });

            }
        }
      }

    return (
        <Layout>
            <Head>
                <title>MyShop | Carrinho</title>
            </Head>
            <main>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row my-2">
                            <div className="col-6 col-md-4">
                                <Link href="/shop">
                                    <a className="btn-linkless"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> 
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg> Ir para a loja
                                    </a>
                                </Link>
                            </div>
                            <div className="col-6 col-md-8">
                                <h6 className="float-end">{totalUniqueItems > 0 ? (totalUniqueItems != 1 ? `${totalUniqueItems} itens, ` : " 1 item, ") : "" } Total: R$ {cartTotal}</h6>
                            </div>
                        </div>
                        <Carrinho isEmpty={isEmpty} items={items} updateItemQuantity={updateItemQuantity} removeItem={removeItem} />
                        <div className="row my-2">
                            <div className="col-12">
                                {!isEmpty && (<button type="button" className="btn btn-primary float-end" onClick={checkout} disabled={isLoading}>
                                    {!isLoading && "Finalizar Compra"}
                                    {isLoading && <Spinner animation="border" size="sm" variant="secondary" /> }
                                </button>)}
                                <button type="button" className="btn btn-outline-primary float-end mx-2" onClick={() => route.push("/shop")}>Comprar mais itens</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}