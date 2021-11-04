import Item from "./item";

export default function ProductList(props){
    return(
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {props.items.map((i)  => <Item key={i} id={i}></Item>)}
        </div>
    );
}