import useDebounce from 'hooks/useDebounce'
import { useCallback, useState } from 'react'
import useFetchServerLogs from './useFetchServerLogs'

const DEBOUNCE_INTERVAL = 500

const useServerLog = () => {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, DEBOUNCE_INTERVAL)

  const {
    serverLogs,
    count,
    loading,
    fetchMore,
    setServerLogs
  } = useFetchServerLogs(debouncedSearch)

  const handleSearch = useCallback((value: string) => {
    setServerLogs([])
    setSearch(value)
  }, [])

  return {
    loading,
    count,
    search,
    serverLogs,
    handleSearch,
    fetchMore
  }
}

export default useServerLog
