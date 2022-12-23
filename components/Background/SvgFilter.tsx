export function SvgFilter(p: {
    noiseFrequency: number
    noiseOctave: number
    seed: number
    noiseAmp: number
}) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            style={{ position: 'absolute', display: 'hidden' }}
        >
            <defs>
                <filter id='filter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency={p.noiseFrequency}
                        numOctaves={p.noiseOctave}
                        result='warp'
                        seed={p.seed}
                    ></feTurbulence>
                    <feDisplacementMap scale={p.noiseAmp} in='SourceGraphic' in2='warp' />
                </filter>
            </defs>
        </svg>
    )
}
