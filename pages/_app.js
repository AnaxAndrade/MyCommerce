import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.scss';
//import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import { CartProvider } from "react-use-cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);


function MyApp({ Component, pageProps }) {
  return ( 
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#2d89ef"/>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <CartProvider  onItemAdd={(item) => toast.success(`${item.nome} adicionado ao carrinho`,  { theme: "colored" })}
        onItemUpdate={(item) => toast.info(`Atualizada quantiadade de ${item.nome} `,  { theme: "colored" })}
        onItemRemove={(item) => toast.warn(`Item removido do carrinho`,  { theme: "colored" })}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </CartProvider>
    </>
  );
}

export default MyApp
