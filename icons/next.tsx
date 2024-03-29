import { IconProps } from '../lib/types'

export function Next(props: IconProps) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            style={props.style}
        >
            <path d='M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z' fill={props.color} />
        </svg>
    )
}
