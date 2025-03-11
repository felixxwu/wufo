import { config } from '../lib/config.ts'
import { useSongNum } from '../lib/store.ts'

export function useSongConfig() {
  return config[useSongNum.useState()]
}
