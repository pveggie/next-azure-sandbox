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

      <main className="container mx-auto pt-10 px-5 md:pt-20 md:px-10">
        <PageHeader pageTitle={pageTitle} intro={intro} />
        {children}
      </main>
    </>
  )
}
