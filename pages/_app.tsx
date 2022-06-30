import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div className="h-screen w-full justify-center items-center flex bg-slate-800">
    <div className="flex flex-col bg-slate-700 p-52 rounded-md">
      <Component {...pageProps} />
    </div>
  </div>
  )
}

export default MyApp
