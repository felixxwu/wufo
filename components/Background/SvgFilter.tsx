export function SvgFilter(props: {
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
                        baseFrequency={props.noiseFrequency}
                        numOctaves={props.noiseOctave}
                        result='warp'
                        seed={props.seed}
                    ></feTurbulence>
                    <feDisplacementMap scale={props.noiseAmp} in='SourceGraphic' in2='warp' />
                </filter>
            </defs>
        </svg>
    )
}
