import Link from 'next/link'
import { Fragment } from 'react';
import { useRouter } from "next/router";

function Layout(props){
    const router = useRouter();

    return (
        <Fragment>
            <div className="container">
                <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link href="/" aria-current="page">
                            <a className={router.pathname == "/" ? "nav-link active" : "nav-link"}>Início</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/shop" >
                            <a className={router.pathname.startsWith("/shop") ? "nav-link active" : "nav-link"}>Loja</a>
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
                </header>
            </div>
            {props.children}
        </Fragment>
    );
}

export default Layout;