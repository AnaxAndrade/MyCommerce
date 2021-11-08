import Layout from "../components/base/Layout";
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Head from 'next/head'

export default function Conta(){
    const [user, setUser] = useState(null)
    const router = useRouter()
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(user => setUser(user))
        .catch(() => router.push('/login'))
    }, []);
    if (!user) return null;
    console.log(user);
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
                                    <h3 className="text-center">Bem vindo, {user.attributes.name}</h3>
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

