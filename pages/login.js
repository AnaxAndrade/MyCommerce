import Layout from "../components/base/Layout";
import Head from 'next/head'
import Link from 'next/link'

export default function Cart(){
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
                                            <label for="inputEmail" className="sr-only">Email</label>
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Endereço de email" required="" autofocus=""/>
                                            <label for="inputPassword" className="sr-only">Password</label>
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
                                            <div className="checkbox mb-3">
                                                <label>
                                                <input type="checkbox" value="remember-me"/> Lembrar de mim
                                                </label>
                                            </div>
                                            <div class="d-grid gap-2 text-center">
                                                <button class="btn btn-primary" type="button">Entrar</button>
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