
import styles from './Shimmer.module.css';

export function ItemShimmer(){
    return (
        <div className="col">
            <div className={"card shadow-sm "+styles.card}>
                <div className={styles.box+" "+styles.shine}></div>
                <div className="card-body">
                    <div className={styles.lines+" "+styles.shine}></div>
                </div>
            </div>
        </div>
    );
}

export function GridShimmer(props){
    return (<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        {[...Array(props.items)].map((e, i) => <ItemShimmer key={i} />)}
    </div>
    );
}
