import { IconProps } from '../lib/types'

export function Minus(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      style={props.style}
    >
      <path fill={props.color} d='M0 9h24v6h-24z' />
    </svg>
  )
}
