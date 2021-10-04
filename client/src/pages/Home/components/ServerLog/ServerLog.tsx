import React, { FC, useMemo } from 'react'
import { Column } from 'react-table'
import { Card } from 'components/Card'
import { Search } from 'components/Search'
import { Table } from 'components/Table'

interface UnitConversion {
  fromUnit: string
  toUnit: string
  factor: number
}

export const ServerLog: FC = () => {
  const data: UnitConversion[] = useMemo(
    () => [
      {
        fromUnit: 'inches',
        toUnit: 'millimetres (mm)',
        factor: 25.4
      },
      {
        fromUnit: 'feet',
        toUnit: 'centimetres (cm)',
        factor: 30.48
      },
      {
        fromUnit: 'yards',
        toUnit: 'metres (m)',
        factor: 0.91444
      }
    ],
    []
  )

  const columns: Array<Column<UnitConversion>> = useMemo(
    () => [
      {
        Header: 'To convert',
        accessor: 'fromUnit'
      },
      {
        Header: 'Into',
        accessor: 'toUnit'
      },
      {
        Header: 'Multiply by',
        accessor: 'factor',
        isNumeric: true
      }
    ],
    []
  )
  return (
    <Card title='Server Log'>
      <Search />
      <Table columns={columns} data={data} />
    </Card>
  )
}
