import Layout from "../components/base/Layout";
import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Login(){
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const router = useRouter()

    async function entrar(){
        if (emailRef.current.value.trim().length < 1 || passwordRef.current.value.trim().length < 1 )
        {
            toast.warn(`Preencha todos os dados`,  { theme: "colored" });
            return;
        }
        try{
            //TODO - sign in logic
            toast.success(`Autenticado com sucesso!`,  { theme: "colored" });
            router.push("/account");
        }
        catch(err)  {
            toast.error(`Erro ao entrar: ${err.message}`,  { theme: "colored" });
        }
    }

    return (
        <Layout>
            <Head>
                <title>MyShop | Login</title>
            </Head>
            <main>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="form-signin">
                                            <div className="text-center">
                                                <img className="mb-4" src="/CART.png" alt="" width="72" height="72" />
                                                <h1 className="h3 mb-3 font-weight-normal">Entrar</h1>
                                            </div>
                                            <label htmlFor="inputEmail" className="sr-only">Email</label>
                                            <input type="email" id="inputEmail" ref={emailRef} className="form-control" placeholder="Endereço de email" required="" autoFocus/>
                                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                                            <input type="password" id="inputPassword" ref={passwordRef} className="form-control" placeholder="Password" required=""/>
                                            <div className="checkbox mb-3">
                                                <label>
                                                <input type="checkbox" value="remember-me"/> Lembrar de mim
                                                </label>
                                            </div>
                                            <div className="d-grid gap-2 text-center">
                                                <button className="btn btn-primary" type="button"  onClick={entrar}>Entrar</button>
                                                <p className="my-0">ou</p>
                                                <Link href="/register"><a>Criar uma conta</a></Link>
                                            </div>
                                        </form>
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