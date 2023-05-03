import 'rsuite/dist/rsuite.min.css';
import '@/styles/globals.css'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
// add context here

export default function App({ Component, pageProps, session }: any) {
  return (
  <>
  <SessionProvider session={session}>
    <NavBar/>
    <Component {...pageProps} />
    <Footer/>
  </SessionProvider>
  </>
  )
}
