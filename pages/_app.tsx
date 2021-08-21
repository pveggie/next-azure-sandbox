// https://nextjs.org/docs/advanced-features/custom-app
import { AppProps } from 'next/app'
import '../utils/icons'
import '../styles/globals.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
