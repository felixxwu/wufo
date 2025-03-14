export type Stem = { label: string; category: string }

export const stemNames = {
  drums1: { label: 'Drums 1', category: 'Drums' },
  drums2: { label: 'Drums 2', category: 'Drums' },
  piano: { label: 'Piano', category: 'Piano' },
  bass: { label: 'Bass', category: 'Bass' },
  instr: { label: 'Instruments', category: 'Piano' },
  vocal1: { label: 'Vocal 1', category: 'Vocal' },
  vocal1and2: { label: 'Vocal 1/2', category: 'Vocal' },
  vocal2: { label: 'Vocal 2', category: 'Vocal' },
  vocal3: { label: 'Vocal 3', category: 'Vocal' },
  vocal4: { label: 'Vocal 4', category: 'Vocal' },
  vocal5: { label: 'Vocal 5', category: 'Vocal' },
  arp: { label: 'Arp', category: 'Arp' },
  chords: { label: 'Chords', category: 'Chords' },
  sax: { label: 'Sax', category: 'Sax' },
} as const
