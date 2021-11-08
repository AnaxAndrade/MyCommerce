import Layout from "../components/base/Layout";
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { useSession } from 'next-auth/client';

export default function Conta(){
    const [user, setUser] = useState(null)
    const router = useRouter();

    const [session, loading] = useSession();
    // Check for loggenIn User
    useEffect(()=>{
        if (session)
        {
            setUser(session.user);

            // Get compras User
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
                                    <h3 className="text-center">Bem vindo, {user != null ? user.name : ""}</h3>
                                    <div className="alert alert-info">
                                        <p>Sem compras efetuadas!</p>
                                    </div>
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

