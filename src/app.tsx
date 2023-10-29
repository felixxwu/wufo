import { Background } from './components/Background'
import './styles.css'
import { styled } from './lib/styled'
import { Logos } from './components/Logo'
import { UI } from './components/UI'
import { useState } from 'preact/hooks'
import { Color } from './lib/types'
import { content } from './lib/content'

export function App() {
  const [color, setColor] = useState<Color>([50, 50, 50])

  return (
    <Container>
      <Background color={color} />
      {content.releases.length > 1 && <Logos />}
      <Opacity>
        <UI setColor={setColor} />
      </Opacity>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
})

const Opacity = styled('div', {
  opacity: '0.95',
})
