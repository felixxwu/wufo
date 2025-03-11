import { useRef } from 'react'

export function useRefWithOnChange<T>(initialVale: T, onChange: (value: T) => void) {
  const valueRef = useRef(initialVale)

  return new Proxy(valueRef, {
    set(target, prop, value) {
      if (prop === 'current') {
        target.current = value
        valueRef.current = value
        onChange(value)
      }
      return Reflect.set(target, prop, value)
    },
  })
}
