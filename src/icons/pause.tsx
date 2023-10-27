import { IconProps } from '../lib/types'

export function Pause(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      style={props.style}
    >
      <path d='M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z' fill={props.color} />
    </svg>
  )
}
