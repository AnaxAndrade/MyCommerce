import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Footer from './Footer';
import { useCart } from "react-use-cart";
import { Auth } from 'aws-amplify';

function Layout(props){
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(user => {setIsAuth(true);})
        .catch((err)=>{})
    }, []);

    const router = useRouter();
    const {
        isEmpty,
        cartTotal
      } = useCart();

    function logout(){
        Auth.signOut().then(()=> router.push("/login"));
        ;
    }

    return (
        <Fragment>
            <div className="wrappper">
                <div className="container">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                        <Link  href="/">
                            <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                                <img width="32" height="32" src="/CART.png"/>MyShop
                            </a>
                        </Link>
                        <ul className="nav nav-border col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li className="nav-item">
                                <Link href="/" aria-current="page">
                                    <a className={router.pathname == "/" ? "nav-link active" : "nav-link"}>Início</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/shop" >
                                    <a className={router.pathname.startsWith("/shop") || router.pathname.startsWith("/view") ? "nav-link active" : "nav-link"}>Loja</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about" >
                                    <a className={router.pathname == "/about" ? "nav-link active" : "nav-link"}>Sobre</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact">
                                    <a className={router.pathname == "/contact" ? "nav-link active" : "nav-link"}>Contactos</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="col-md-3 text-end">
                            <Link href="/cart">
                                <a className="btn btn-outline-primary me-2">
                                    {!isEmpty && <span>R$ {cartTotal} </span>} 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </a>
                            </Link>
                            {isAuth && <Link href="/account"><a className="btn btn-outline-secondary">Conta</a></Link> }
                            {isAuth && <button type="button" onClick={logout} className="btn btn-outline-danger mx-2">Sair</button> }
                            {!isAuth && <Link href="/login"><a className="btn btn-primary">Entrar</a></Link> }
                        </div>
                    </header>
                </div>
                {props.children}

                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Layout;