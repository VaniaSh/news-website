import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components";
import {StringProvider} from "@/context/changeType";

export default function App({Component, pageProps}: AppProps) {
  return (
      <>
          <StringProvider>
              <Header/>
              <Component {...pageProps} />
          </StringProvider>
      </>
  )
}
