import { useEffect, useState } from 'react'

/**
 * Hook to debounce a function
 * @param value {any}
 * @param delay {number}
 * @returns {[any, (value: any) => void]}
 */
export default function useDebounce (value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay]
  )

  return debouncedValue
}
