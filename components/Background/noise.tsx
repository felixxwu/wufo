export function Noise() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            viewBox='0 0 700 700'
            width='100%'
            height='100%'
            opacity='0.1'
        >
            <defs>
                <filter
                    id='nnnoise-filter'
                    x='-20%'
                    y='-20%'
                    width='140%'
                    height='140%'
                    filterUnits='objectBoundingBox'
                    primitiveUnits='userSpaceOnUse'
                    colorInterpolationFilters='linearRGB'
                >
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.2'
                        numOctaves='4'
                        seed='15'
                        stitchTiles='stitch'
                        x='0%'
                        y='0%'
                        width='100%'
                        height='100%'
                        result='turbulence'
                    ></feTurbulence>
                    <feSpecularLighting
                        surfaceScale='40'
                        specularConstant='3'
                        specularExponent='20'
                        lightingColor='#ffffff'
                        x='0%'
                        y='0%'
                        width='100%'
                        height='100%'
                        in='turbulence'
                        result='specularLighting'
                    >
                        <feDistantLight azimuth='3' elevation='1'></feDistantLight>
                    </feSpecularLighting>
                </filter>
            </defs>
            <rect width='700' height='700' fill='transparent'></rect>
            <rect width='700' height='700' fill='#ffffff' filter='url(#nnnoise-filter)'></rect>
        </svg>
    )
}
