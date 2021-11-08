import {useRouter} from "next/router";
import Layout from "../../components/base/Layout";
import Head from 'next/head'
import Image from 'next/image'
import ProductList from '../../components/products/product-list'
import Link from 'next/link';
import style from '../../styles/Details.module.css';

export default function DetalhesProduto({item, featured}){
    const route = useRouter();

    function addToCartHandler(){

    }

    return (
        <Layout>
            <Head>
                <title>MyShop | {item.nome}</title>
                <meta name="title" content={item.nome} />
                <meta name="description" content={item.descricao} />
            </Head>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className={"btn btn-link "+style.linkless} onClick={() => route.back()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> 
                                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                        </svg> Voltar
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-md-4">
                                                    <Image src={item.imagem} layout="responsive" width={220} height={200}  />
                                                </div>
                                                <div className="col-md-6">
                                                    <small>{item.categoria}</small>
                                                    <h2>{item.nome}</h2>
                                                    <h5 className="text-primary">R$ {item.preco}</h5>
                                                    <button type="button" className="btn btn-outline-primary my-2" onClick={addToCartHandler}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                                                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                        </svg> Adicionar ao carrinho
                                                    </button>
                                                    <p className="my-3">{item.descricao}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <h4>Outros produtos</h4>
                            <ProductList items={featured} onAddToCart={(p) => {}} />
                        </div>
                    </div>
                </main>
        </Layout>
    );
}

export async function getStaticProps({params}){

    // Obter dados do produto
    const req = await fetch(`${process.env.BASE_URL}/api/products/${params.id}`).catch(err => console.log(err));
    let prod = null;
    if (req)
    {
        prod = await req.json();
    }

    // Obter sugestão de outros produtos
    let itens = [];
    const reqf = await fetch(`${process.env.BASE_URL}/api/featured?limit=4`).catch(err =>{});
    if (reqf)
    {
        itens = await reqf.json();
    }

    return {
        props: {
          item: prod,
          featured: itens
        },
        revalidate: 3600
      }
}

export async function getStaticPaths(){
    /* 
        PARA GERAR ESTATICAMENTE PATH PARA TODOS OS PRODUTOS
    */
   
   const req = await fetch(`${process.env.BASE_URL}/api/ids`).catch(err => console.log(err));
   const pathss = await req.json();
   
   //const pathss =  ['2-36', '1-16', '1-21', '2-2']; // PRÉ GERAR APENAS PARA ALGUMAS PATHS

    return {
        paths: pathss.map(p => ({params: {id: p} })),
        fallback: 'blocking'
    }

}