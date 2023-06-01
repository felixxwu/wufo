import { Background } from '../components/Background'
import { UI } from '../components/UI'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const [show, setShow] = useState(false)
    const router = useRouter()

    return (
        <div>
            <Background onLoad={() => setShow(true)} noZoom={true} />
            {show && <UI slug={router.query.slug as string} />}
        </div>
    )
}
