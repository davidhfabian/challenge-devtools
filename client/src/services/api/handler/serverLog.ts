import { api } from '../apiClient'

export const getServerLogs = async (params: any, search: string) =>
  await api.get(`/server-log?description=${search}&server=${search}`, { params })
