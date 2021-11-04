import Link from 'next/link';
import styles from './Item.module.css';
export default function Item(props){
    return (
        <div className="col">
            <Link href={"/view/"+props.id}>
                <div className={"card shadow-sm "+styles.card}>
                <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="40%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                <div className="card-body">
                    <span className={"text-center "+styles.name}>O nome do produto</span>
                    <span className={"text-center text-primary mb-3 "+styles.price}><b>R$ 1.590</b></span>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-primary">Adicionar ao carrinho</button>
                        </div>
                        <small className="text-muted">9 disponíveis</small>
                    </div>
                </div>
                </div>
            </Link>
        </div>
    );
}