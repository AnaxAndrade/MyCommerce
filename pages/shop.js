import Layout from "../components/base/Layout";
import { Fragment } from 'react'
import ProductList from '../components/products/product-list'
import Link from 'next/link';
import Head from 'next/head'

export default function Shop(){
    return (
        <Layout>
            <Fragment>
                <Head>
                    <title>MyShop | Loja</title>
                    <meta name="description" content="Lista de Produtos MyShop" />
                </Head>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="col-md-6 offset-md-3">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Pesquisar Produto" aria-label="Pesquisar Produto" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-primary" type="button" id="button-addon2">Pesquisar</button>
                                </div>
                            </div>
                            <br/>
                            <ProductList items={[]}/>
                        </div>
                    </div>
                </main>
            </Fragment>
        </Layout>
    );
}