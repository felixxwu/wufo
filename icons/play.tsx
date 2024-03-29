import { IconProps } from '../lib/types'

export function Play(props: IconProps) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='-3 0 24 24'
            style={props.style}
        >
            <path d='M3 22v-20l18 10-18 10z' fill={props.color} />
        </svg>
    )
}
