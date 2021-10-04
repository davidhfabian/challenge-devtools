export interface QueryServerLog {
  pagination?: Pagination
  description?: string
  server?: string
}

export interface Pagination {
  offset: number
  limit: number
  count?: number
}

export interface AppConfig {
  port: number
  apiUrl: string
}

export interface Filters {
  description: string
  server: string
  [k: string]: string
}
