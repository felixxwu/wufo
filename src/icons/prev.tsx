import { IconProps } from '../lib/types'

export function Prev(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      style={props.style}
    >
      <path d='M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z' fill={props.color} />
    </svg>
  )
}
