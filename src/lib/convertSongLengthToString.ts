export function convertSongLengthToString(length: number) {
  if (length === 0) return '-:--'
  const seconds = Math.floor(length / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
