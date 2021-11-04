import Layout from "../components/base/Layout";
import { Fragment } from 'react';
import ProductList from '../components/products/product-list';
import Link from 'next/link';
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import {GridShimmer} from  '../components/products/product-shimmer';
export default function Shop(){
    const searchRef = useRef("");

    const pageSize = 8;
    
    const { data, error } = useSWR('/api/products?limit=100', fetcher);
    const [filtrados, setFiltrados] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pagePointer, setPagePointer] = useState(0);

    function clear(){
        searchRef.current.value = "";
        setSearchTerm("");
    }

    function search(){
        setSearchTerm(searchRef.current.value);
    }

    function loadMore(){
        if (!data || error)
        {
            return setPagePointer(0);
        }

        let ate =  filtrados.length >= pagePointer + pageSize ? pagePointer + pageSize : filtrados.length;

        setPagePointer(ate);
    }

    useEffect(()=>{
        if (data)
        {
            //Filtrar os produtos de acordo com o termo pesquisado
            let filtered = data;
            if (searchTerm && searchTerm.trim().length > 0)
            {
                filtered = data.filter((x) => {
                    let terms = searchTerm.split(" ");
                    for (let i = 0; i < terms.length; i++) {
                    // Descartar a opção caso não contenha uma das palavras da busca
                    if (
                        (x.nome || "").toLowerCase().indexOf((terms[i] || "").toLowerCase()) <
                        0
                    ) {
                        return false;
                    }else{
                        return true;
                    }
                    } 
                });
            }

            //console.log(pagePointer+"/"+data.length);
            setFiltrados(filtered);
            setPagePointer(Math.min(pageSize, filtered.length));
        }
    },[data, searchTerm]);

    useEffect(()=>{
        setProdutos(filtrados.slice(0, pagePointer));
    }, [filtrados, pagePointer]);

    return (
        <Layout>
                <Head>
                    <title>MyShop | Loja</title>
                    <meta name="description" content="Lista de Produtos MyShop" />
                </Head>
                <main>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="col-md-6 offset-md-3">
                                <div className="input-group mb-3">
                                    <input ref={searchRef} type="text" className="form-control" placeholder="Pesquisar Produto" aria-label="Pesquisar Produto" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={search}>Pesquisar</button>
                                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={clear}>Limpar</button>
                                </div>
                            </div>
                            <br/>
                            {error && <div className="alert alert-danger"><p>Erro ao carregar lista de produtos!</p></div>}
                            {produtos && !error && <ProductList items={produtos}/> }
                            {produtos && !error && pagePointer < filtrados.length &&  <div className="text-center my-4"><button type="button" className="btn btn-outline-secondary" onClick={loadMore}>Carregar mais...</button> </div>}
                            {!data && !error && <GridShimmer items={8} />}
                            {data && produtos && produtos.length == 0 && !error && <div className="alert alert-info"><p>Sem Itens para mostrar!</p></div>}
                        </div>
                    </div>
                </main>
        </Layout>
    );
}