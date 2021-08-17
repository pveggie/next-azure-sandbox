import Head from 'next/head'
import Header from '../organisms/Header'
import { siteTitle } from '../../utils/siteConfig'

export default function DefaultLayout({ children, isHome, pageTitle }) {
  return (
    <>
      <Head>
        <title>
          {siteTitle}
          {!isHome && pageTitle ? ` | ${pageTitle}` : ''}
        </title>
      </Head>

      <Header />
      <main className="container mx-auto">{children}</main>
    </>
  )
}
