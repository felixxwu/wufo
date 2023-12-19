import { h } from 'preact'
import { CSSProperties } from 'preact/compat'

export function styled<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  styles?: CSSProperties,
  className?: string
) {
  return (props: HTMLElementTagNameMap[T] | { [key: string]: any }) => {
    const classNames = `${className ?? ''} ${props.className ?? ''}`
    return h(
      // @ts-ignore
      tag,
      {
        ...(props ?? {}),
        style: { ...(styles ?? {}), ...(props.style ?? {}) },
        ...(className || props.className ? { className: classNames } : {}),
      },
      ...(Array.isArray(props.children) ? props.children ?? [] : [props.children])
    )
  }
}

export function styledSVG<T extends keyof SVGElementTagNameMap>(tag: T, styles?: CSSProperties) {
  return (props: SVGElementTagNameMap[T] | { [key: string]: any }) => {
    return h(
      // @ts-ignore
      tag,
      {
        ...(props ?? {}),
        style: { ...(styles ?? {}), ...(props.style ?? {}) },
      },
      ...(Array.isArray(props.children) ? props.children ?? [] : [props.children])
    )
  }
}
