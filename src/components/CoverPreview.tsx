import { useEffect, useRef, useState } from 'preact/hooks'
import { styled } from '../lib/styled'
import { IRelease } from '../lib/types'
import { BORDER_RADIUS_LARGE, BOX_SHADOW } from '../lib/consts'

export function CoverPreview({
  release,
  onClose,
}: {
  release: IRelease | null
  onClose: () => void
}) {
  const [oldCover, setOldCover] = useState<IRelease | null>(null)
  const timeout = useRef<number | null>(null)

  useEffect(() => {
    if (release) {
      setOldCover(release)
      clearTimeout(timeout.current!)
    } else {
      timeout.current = setTimeout(() => {
        setOldCover(null)
      }, TRANSITION)
    }
  }, [release])

  useEffect(() => {
    document.body.parentElement!.style.overflowY = oldCover ? 'hidden' : 'auto'
  }, [oldCover])

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  if (!oldCover) return null

  return (
    <Container
      style={{
        ...(release ? { opacity: 1, filter: 'blur(0px)' } : {}),
        backgroundColor: `rgb(${release?.color.join(', ')})`,
      }}
      onclick={handleClick}
    >
      <Cover src={oldCover.cover} />
    </Container>
  )
}

const TRANSITION = 500

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
  cursor: 'pointer',
  transition: `${TRANSITION}ms`,
})

const Cover = styled('img', {
  width: '90vw',
  maxWidth: '90vh',
  height: '90vh',
  maxHeight: '90vw',
  borderRadius: BORDER_RADIUS_LARGE,
  boxShadow: BOX_SHADOW,
})
