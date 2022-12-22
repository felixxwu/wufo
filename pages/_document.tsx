import { Html, Head, Main, NextScript } from 'next/document'
import { colours } from '../lib/colours'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'true'} />
                <link
                    href='https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;900&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body style={{ backgroundColor: colours.bg, color: colours.text }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
