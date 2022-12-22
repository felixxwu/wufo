import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Background } from '../components/Background'
import { UI } from '../components/UI'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [show, setShow] = useState(false)

    return (
        <div>
            <Background onLoad={() => setShow(true)} />
            {show && <UI />}
        </div>
    )
}
