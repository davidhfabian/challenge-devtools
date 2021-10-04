/* eslint-disable react/jsx-key */ // FIXME: correct this
import { Table as TableChakra, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, Column } from 'react-table'

export interface DataTableProps<Data extends object> {
  data: Data[]
  columns: Array<Column<Data>>
}

export const Table = <Data extends object>({ columns, data }: DataTableProps<Data>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy)

  return (
    <TableChakra {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                // @ts-expect-error
                {...column.getHeaderProps(column?.getSortByToggleProps())}
                // @ts-expect-error
                isNumeric={column?.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl='4'>
                  {// @ts-expect-error
                    column.isSorted === true ? (
                    // @ts-expect-error
                      column.isSortedDesc === true ? (
                        <TriangleDownIcon aria-label='sorted descending' />
                      ) : (
                        <TriangleUpIcon aria-label='sorted ascending' />
                      )
                    ) : null
                  }
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                // @ts-expect-error
                <Td {...cell.getCellProps()} isNumeric={cell.column?.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </TableChakra>
  )
}
