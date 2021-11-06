import Layout from '../components/base/Layout'
import Head from 'next/head'
import { Fragment } from 'react'
import Hero from '../components/home/hero'

export default function About(){
    return (
        <Layout>
      <Fragment>
        <Head>
          <title>MyShop | Sobre</title>
          <meta name="description" content="É um Web App e-commerce fictício, criado para demonstrar skills com NextJS/React!" />
        </Head>
        <main>
          <Hero goShopBtn={true} contactBtn={true}>
            <h1 className="fw-light">Sobre o MyShop</h1>
            <p className="lead text-muted">É um Web App E-commerce fictício, criado por <a href="https://www.linkedin.com/in/anaxandrade" target="_blank" rel="noreferrer">Anaximandro Andrade</a> para demonstrar skills com NextJS/React & NodeJS!</p>
          </Hero>
        </main>
      </Fragment>
    </Layout>
    );
}