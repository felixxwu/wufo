import { useState } from 'preact/hooks'
import { Button } from './Button'
import { Copy } from '../icons/copy'
import { IRelease } from '../lib/types'
import { sleep } from '../lib/sleep'
import { Tick } from '../icons/tick'

export function CopyLink({ release }: { release: IRelease }) {
  const [shared, setShared] = useState(false)

  const handleCopy = async () => {
    navigator.clipboard.writeText('https://wufo.uk/' + release.slug)
    setShared(true)
    await sleep(2000)
    setShared(false)
  }

  return (
    <Button
      label={shared ? 'Link Copied' : 'Copy Link'}
      Icon={shared ? Tick : Copy}
      onClick={handleCopy}
    />
  )
}
