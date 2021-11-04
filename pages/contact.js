import Layout from "../components/base/Layout";
import Head from 'next/head';
import { Fragment } from 'react';
import Hero from '../components/home/hero';
import styles from '../styles/Contact.module.css';

export default function About(){
    return (
        <Layout>
      <Fragment>
        <Head>
          <title>MyShop | Contatos</title>
          <meta name="description" content="É um Web App E-commerce fictício, criado para demonstrar skills com NextJS/React!" />
        </Head>
        <main>
          <Hero goShopBtn={true} contactBtn={false}>
            <h1 className="fw-light">Entre em Contato</h1>
            <p className="lead"><b>Desenvolvido por:</b>  Anaximandro Andrade</p>
            <p className="lead text-muted">Para quaisquer esclarecimentos, pode utilizar dos seguintes meios:</p>
            <ul className={styles.contacts+" justify-content-center"}>
                <li><a href="https://www.linkedin.com/in/anaxandrade/" target="_blank">LinkedIn</a></li>
                <li><a href="https://github.com/AnaxAndrade" target="_blank">GitHub</a></li>
                <li><a href="mailto:anaxfive@hotmail.com" target="_blank">Email</a></li>
            </ul>
          </Hero>
        </main>
      </Fragment>
    </Layout>
    );
}