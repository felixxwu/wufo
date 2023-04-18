import { Html, Head, Main, NextScript } from 'next/document'
import { colors } from '../lib/colors'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'true'} />
                <link
                    href='https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;600;900&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body style={{ backgroundColor: colors.bg, color: colors.text }}>
                <Main />
                <NextScript />
                <script
                    src='https://w.soundcloud.com/player/api.js'
                    type='text/javascript'
                ></script>
            </body>
        </Html>
    )
}
