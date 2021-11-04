import Layout from '../components/base/Layout'
import Head from 'next/head'
import { Fragment } from 'react'
import Hero from '../components/home/hero'

export default function About(){
    return (
        <Layout>
      <Fragment>
        <Head>
          <title>My Commerce | Sobre</title>
          <meta name="description" content="É um Web App E-commerce fictício, criado para demonstrar skills com NextJS/React!" />
        </Head>
        <main>
          <Hero goShopBtn={true} contactBtn={true}>
            <h1 className="fw-light">Sobre o My Commerce</h1>
            <p className="lead text-muted">É um Web App E-commerce fictício, criado para demonstrar skills com NextJS/React!</p>
          </Hero>
        </main>
      </Fragment>
    </Layout>
    );
}