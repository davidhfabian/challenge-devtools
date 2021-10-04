import React, { FC } from 'react'
import { Column } from 'react-table'
import { Card } from 'components/Card'
import { Search } from 'components/Search'
import { Table } from 'components/Table'
import useServerLog from './hooks/useServerLog'

interface UnitConversion {
  description: string
  server: string
  serverType: string
  createdAt: string
}

const columns: Array<Column<UnitConversion>> = [
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Server',
    accessor: 'server'
  },
  {
    Header: 'Server type',
    accessor: 'serverType'
  },
  {
    Header: 'Date',
    accessor: 'createdAt'
  }
]

export const ServerLog: FC = () => {
  const {
    serverLogs,
    search,
    count,
    loading,
    fetchMore,
    handleSearch
  } = useServerLog()

  return (
    <Card title='Server Log'>
      <Search search={search} handleSearch={handleSearch} />
      <Table
        columns={columns}
        data={serverLogs}
        search={search}
        fetchMore={fetchMore}
        count={count}
        loading={loading}
      />
    </Card>
  )
}
