import Layout from "../components/base/Layout";
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Registar(){
    const nomeRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmRef = useRef("");
    const router = useRouter();
    const [isConfirm, setIsConfirm] = useState(false);

    async function registar(){
        if (emailRef.current.value.trim().length < 1 || passwordRef.current.value.trim().length < 1 || nomeRef.current.value.trim().length < 1)
        {
            toast.warn(`Preencha todos os dados`,  { theme: "colored" });
            return;
        }
        try{
            const sign = await Auth.signUp({ username: emailRef.current.value, password: passwordRef.current.value, attributes: { name: nomeRef.current.value }});
            toast.info(`Cadastrado com sucesso, verifique seu email com código de confirmação!`,  { theme: "colored" });
            setIsConfirm(true);
        }
        catch(err)  {
            toast.error(`Erro ao registar a conta: ${err.message}`,  { theme: "colored" });

        }
    }

    async function confirmar(){
        try{
            const conf = await Auth.confirmSignUp(emailRef.current.value, confirmRef.current.value);
            const sign = await Auth.signIn({ username: emailRef.current.value, password: passwordRef.current.value});
            toast.info(`Confirmado com sucesso!`,  { theme: "colored" });
            router.push("/account");
        }
        catch(err)  {
            toast.error(`Erro ao confirmar a conta: ${err.message}`,  { theme: "colored" });
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
                                            <input type="email" id="inputEmail" ref={emailRef} className="form-control" placeholder="Endereço de email"/>
                                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                                            <input type="password" id="inputPassword" ref={passwordRef} className="form-control" placeholder="Password"/>
                                            
                                            {isConfirm &&  <label htmlFor="inputConfirm" className="sr-only">Código de Confirmação</label> }
                                            {isConfirm &&  <input type="text" id="inputConfirm" ref={confirmRef} className="form-control" placeholder="Enviado por email"/> }
                                            <div className="d-grid gap-2 text-center my-3">
                                                {!isConfirm && <button className="btn btn-primary" type="button" onClick={registar}>Criar Conta</button> }
                                                {isConfirm && <button className="btn btn-primary" type="button" onClick={confirmar}>Confirmar Conta</button> }
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