import { JSX } from 'preact/jsx-runtime'
import styled from 'styled-components'

export function FadeInDelay(props: { children: JSX.Element; delay: number; duration?: number }) {
  return (
    <Container
      style={{
        animationDelay: `${props.delay}ms`,
        animationDuration: `${props.duration ?? 2000}ms`,
      }}
    >
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  opacity: 0;
  animation-name: fade-in;
  animation-fill-mode: forwards;
`
