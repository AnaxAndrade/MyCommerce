import Layout from "../components/base/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { useSession } from 'next-auth/client';
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import Compras from "../components/products/compras";
import { Spinner } from 'react-bootstrap';

export default function Conta(){
    const [user, setUser] = useState(null);
    const [compras, setCompras] = useState(null);
    const router = useRouter();

    const [session, loading] = useSession();
    
    const { data, error } = useSWR('/api/compras', fetcher);

    // Check for loggenIn User
    useEffect(()=>{
        if (session)
        {
            setUser(session.user);

        }else{
            if (!loading)
            {
                router.push('/login');
            }
            else{
                return null;
            }
        }
    }, [session, loading]);
    
    useEffect(()=>{
        if (data){
            setCompras(data);
        }
    }, [data]);
    
    if (!session || session.user == null) return null;

    
    return (
         <Layout>
         <Head>
             <title>MyShop | Conta</title>
         </Head>
         <main>
             <div className="album py-5 bg-light">
                 <div className="container">
                     <div className="row">
                         <div className="col-md-8 offset-md-2">
                             <div className="card">
                                <div className="card-body">
                                    <h3 className="text-center">Bem vindo, {user != null ? user.name: ""}</h3>
                                    {compras && compras.length == 0 && (<div className="alert alert-info">
                                            <p>Sem compras efetuadas!</p>
                                        </div>)
                                    }
                                    {compras && compras.length > 0 && (<><h6>Minhas Compras</h6><Compras items={compras} /></>)
                                    }
                                     {!compras && !error && (<p className="text-center"><Spinner animation="border" size="sm" variant="secondary" /> Carregando....</p>)
                                    }
                                </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </main>
     </Layout>
    );
}

