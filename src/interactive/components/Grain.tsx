const GRAIN_DENSITY = 700

export function Grain() {
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100svh',
        opacity: '0.15',
      }}
      viewBox={`0 0 ${GRAIN_DENSITY} ${GRAIN_DENSITY}`}
    >
      <defs>
        <filter id='grain' x='0%' y='0%' height={`${GRAIN_DENSITY}px`} width={`${GRAIN_DENSITY}px`}>
          <feTurbulence type='fractalNoise' result='cloudbase' baseFrequency='0.7' numOctaves='1' />
          <feColorMatrix
            in='cloud'
            result='wispy'
            type='matrix'
            values='0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    1 0 0 0 0'
          />
        </filter>
      </defs>
      <rect fill='white' filter='url(#grain)' x={`-100vw`} width={`100vw`} height={`100svh`}></rect>
    </svg>
  )
}
