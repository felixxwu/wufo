import { IconProps } from '../lib/types'

export function Plus(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      style={props.style}
    >
      <path fill={props.color} d='M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z' />
    </svg>
  )
}
