import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../lib/styles.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>WUFO</title>
                <meta name='description' content='Drum & Bass producer based in London' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/wufo256.png' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
