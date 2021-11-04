import Link from 'next/link';

export default function Hero(props){
    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                {props.children}
                <p>
                    {
                        props.goShopBtn && <Link href="/shop"><a className="btn btn-primary my-2 mx-1">Ir para a loja</a></Link>
                    } 
                    {
                         props.contactBtn && <Link href="/contact"><a className="btn btn-outline-primary my-2">Contacte-nos</a></Link>
                    }  
                    
                </p>
            </div>
            </div>
        </section>
    );
}