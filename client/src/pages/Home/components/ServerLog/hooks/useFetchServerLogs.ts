import { useEffect, useState, useCallback } from 'react'
import { getServerLogs } from 'services/api/handler/serverLog'

const DEFAULT_LIMIT = 10
const INITIAL_COUNT = 0

const useFetchServerLogs = (search: string, limit = DEFAULT_LIMIT) => {
  const [serverLogs, setServerLogs] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(INITIAL_COUNT)

  const fetchServerLogs = useCallback(() => {
    setLoading(true)
    const params = {
      pagination: {
        offset: serverLogs.length,
        limit
      }
    }

    getServerLogs(params, search)
      .then(({ data }: any) => {
        const { data: serverLogsData, pagination } = data
        setServerLogs((prevServerLogs: any[]) => [...prevServerLogs, ...serverLogsData])
        setCount(pagination.count)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [serverLogs.length, search])

  useEffect(() => {
    fetchServerLogs()
  }, [search])

  return {
    loading,
    count,
    serverLogs,
    setServerLogs,
    fetchMore: fetchServerLogs
  }
}

export default useFetchServerLogs
