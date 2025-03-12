import { styled } from 'goober'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { useLoopRequested } from '../lib/store.ts'

export function Stems() {
  const { files } = useSongConfig()
  const loopRequested = useLoopRequested.useState()

  const allStems = Array.from(new Set(files.map(file => file.stems).flat()))
  const requestedStems = files[loopRequested].stems

  return (
    <Div>
      {allStems.map(stem => (
        <Text key={stem} active={requestedStems.includes(stem)}>
          {stem}
        </Text>
      ))}
    </Div>
  )
}

const Div = styled('div')`
  display: flex;
  gap: 10px;
`

const Text = styled('span')<{ active: boolean }>`
  background-color: #555;
  padding: 5px;
  opacity: ${p => (p.active ? 1 : 0.5)};
`
