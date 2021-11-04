import Link from 'next/link';

export default function Hero(){
    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Bem vindo a My Commerce</h1>
                <p className="lead text-muted">Aqui você encontra os melhores produtos nos melhores preços!</p>
                <p>
                    <Link href="/shop"> 
                        <a className="btn btn-primary my-2 mx-1">Ir para a loja</a>
                    </Link>
                    <Link href="/contact">
                        <a className="btn btn-secondary my-2">Contacte-nos</a> 
                    </Link>
                </p>
            </div>
            </div>
        </section>
    );
}