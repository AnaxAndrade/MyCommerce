import Layout from "../components/base/Layout";
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';

export default function Registar(){
    const nomeRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function registar(){
        if (emailRef.current.value.trim().length < 1 || passwordRef.current.value.trim().length < 1 || nomeRef.current.value.trim().length < 1)
        {
            toast.warn(`Preencha todos os dados`,  { theme: "colored" });
            return;
        }
        try{
            setIsLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nomeRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
            });
           
            const data = await res.json();

            if (data.status){
                toast.success(`Cadastrado com sucesso, entre com sua conta!`,  { theme: "colored" });
                router.push("/login");
            }else {
                toast.error(`Erro ao registar a conta: ${data.message}`,  { theme: "colored" });
            }
            setIsLoading(false);
        }
        catch(err)  {
            toast.error(`Erro ao registar a conta: ${err.message}`,  { theme: "colored" });

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
                                                <h1 className="h3 mb-3 font-weight-normal">Criar Conta</h1>
                                            </div>
                                            <label htmlFor="inputNome" className="sr-only">Nome</label>
                                            <input type="text" id="inputNome" ref={nomeRef} className="form-control" placeholder="Nome" autoFocus/>
                                            <label htmlFor="inputEmail" className="sr-only">Email</label>
                                            <input type="email" id="inputEmail" ref={emailRef} className="form-control" placeholder="Endere??o de email"/>
                                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                                            <input type="password" id="inputPassword" ref={passwordRef} className="form-control" placeholder="Password"/>
                                            <div className="d-grid gap-2 text-center my-3">
                                                <button className="btn btn-primary" type="button" onClick={registar}  disabled={isLoading}>
                                                    {!isLoading && "Criar Conta" }
                                                    {isLoading && <Spinner animation="border" size="sm" variant="secondary" /> }
                                                </button>
                                                <p className="my-0">ou</p>
                                                <Link href="/login"><a>Entrar</a></Link>
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