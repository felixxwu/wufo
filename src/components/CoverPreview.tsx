import { useEffect, useState } from 'preact/hooks'
import { styled } from '../lib/styled'
import { IRelease } from '../lib/types'

export function CoverPreview({
  release,
  onClose,
}: {
  release: IRelease | null
  onClose: () => void
}) {
  const [oldCover, setOldCover] = useState<IRelease | null>(null)

  useEffect(() => {
    if (release) {
      setOldCover(release)
    }
  }, [release])

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  return (
    <Container
      style={release ? { opacity: 1, pointerEvents: 'all', filter: 'blur(0px)' } : {}}
      onclick={handleClick}
    >
      <Cover src={oldCover?.cover} />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: '0',
  left: '0',
  opacity: 0,
  filter: 'blur(50px)',
  pointerEvents: 'none',
  cursor: 'pointer',
  backgroundColor: 'rgba(0, 0, 0)',
  transition: '500ms',
})

const Cover = styled('img', {
  width: '100vw',
  maxWidth: '100vh',
  height: '100vh',
  maxHeight: '100vw',
})
