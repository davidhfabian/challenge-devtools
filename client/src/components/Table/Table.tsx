import InfiniteScroll, { Props } from 'react-infinite-scroll-component'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, Column } from 'react-table'
import { nanoid } from 'nanoid'
import {
  Table as TableChakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Spinner,
  Center,
  useColorModeValue
} from '@chakra-ui/react'
import EmptyState from '../EmptyState/EmptyState'

export interface DataTableProps<Data extends object> {
  data: Data[]
  columns: Array<Column<Data>>
  count: number
  search: string
  loading: boolean
  fetchMore: Props['next']
}

export const Table = <Data extends object>({ columns, data, count, search, loading, fetchMore }: DataTableProps<Data>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy)

  const colorSpinner = useColorModeValue('gray.200', '#FFF059')

  if (!count && !loading) {
    const description = search && `No results found for ${search}.`

    return (
      <EmptyState
        title='No results'
        description={description}
      />
    )
  }

  return (
    <Box mt={6}>
      <InfiniteScroll
        dataLength={rows.length}
        next={fetchMore}
        hasMore={rows.length < count}
        loader={
          <Center my={4} height='max-content'>
            <Spinner size='lg' color={colorSpinner} />
          </Center>
        }
        height={450}
      >
        <TableChakra {...getTableProps()} variant='striped'>
          <Thead>
            {headerGroups.map((headerGroup, idx) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={nanoid()}>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    key={nanoid()}
                    {...column.getHeaderProps(column?.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <chakra.span pl='4'>
                      {column.isSorted && (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      )}
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
                <Tr {...row.getRowProps()} key={nanoid()}>
                  {row.cells.map((cell: any) => (
                    <Td key={nanoid()} {...cell.getCellProps()} isNumeric={cell.column?.isNumeric}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </TableChakra>
      </InfiniteScroll>
    </Box>
  )
}
