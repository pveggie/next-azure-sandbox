import Head from 'next/head'
import SiteHeader from '../templates/SiteHeader'
import PageHeader from '../templates/PageHeader'
import { siteTitle } from '../../utils/siteConfig'

export interface LayoutProps {
  children?: JSX.Element[] | JSX.Element
  isHome?: boolean
  pageTitle?: string
  intro?: string
}

export default function DefaultLayout({
  children,
  isHome,
  pageTitle,
  intro,
}: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {siteTitle}
          {!isHome && pageTitle ? ` | ${pageTitle}` : ''}
        </title>
      </Head>

      <SiteHeader />

      <main className="container mx-auto px-5 py-10 md:px-10 md:py-20">
        {pageTitle && <PageHeader pageTitle={pageTitle} intro={intro} />}
        {children}
      </main>
    </>
  )
}
