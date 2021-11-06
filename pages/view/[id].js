import {useRouter} from "next/router";
import Layout from "../../components/base/Layout";
import Head from 'next/head'
import config from "../../lib/config";
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
                <title>MyShop | Loja</title>
                <meta name="description" content="Lista de Produtos MyShop" />
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

    const req = await fetch(`${config.BASE_URL}/api/products/${params.id}`).catch(err =>{});
    let prod = null;
    if (req)
    {
        prod = await req.json();
    }

    let itens = [
        {
          nome: "Ergonomic Fresh Bacon",
          descricao: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
          categoria: "Generic",
          imagem: "http://placeimg.com/640/480/animals",
          preco: "174.00",
          material: "Concrete",
          departamento: "Garden",
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
          id: "2-36"
        },
        {
          nome: "Fantastic Steel Salad",
          descricao: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
          categoria: "Refined",
          imagem: "http://placeimg.com/640/480/nature",
          preco: "716.00",
          material: "Metal",
          departamento: "Tools",
          id: "1-2"
        },
        {
          nome: "Generic Plastic Bike",
          descricao: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
          categoria: "Generic",
          imagem: "http://placeimg.com/640/480/abstract",
          preco: "14.00",
          material: "Granite",
          departamento: "",
          id: "2-6"
        }
      ];

    return {
        props: {
          item: prod,
          featured: itens
        },
        revalidate: 60
      }
}

export async function getStaticPaths(){
   /* const req = await fetch(`${config.BASE_URL}/api/ids`).catch(err =>{});
    const pathss = await req.json();
    console.log(pathss.map(p => ({params: {id: p} }))); */
    return {
        paths:  [
            {params: {id: '1-28'}},
            {params: {id: '2-36'}},
            {params: {id: '1-2'}},
            {params: {id: '2-6'}}
        ],
        fallback: 'blocking'
    }
}