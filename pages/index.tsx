import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../src/layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className='text-xl text-red-600'>uwu</h1>
      <Link href="/auth">auth</Link>
    </Layout>
  )
}

export default Home
