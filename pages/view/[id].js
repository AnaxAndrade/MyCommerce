import {useRouter} from "next/router";
import Layout from "../../components/base/Layout";


export default function DetalhesProduto(props){
    const router = useRouter();
    return (
        <Layout>
            <h3>Produto: {router.query.id}</h3>
        </Layout>
    );
}