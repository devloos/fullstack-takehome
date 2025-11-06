import { memo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from '@apollo/client/react'
import { GetUsersDocument, type GetUsersQuery } from '../../__generated__/graphql'
import { useState } from 'react'

import { TableFilters } from './TableFilters'
import { GenericCell } from './cells/GenericCell'
import { LoadingSpinner } from '../LoadingSpinner'

const columnHelper = createColumnHelper<GetUsersQuery['users'][0]>()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => <GenericCell value={getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => <GenericCell value={getValue()} />,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: ({ getValue }) => <GenericCell value={getValue()} />,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => <GenericCell value={getValue()} />,
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: ({ getValue }) => <GenericCell value={getValue()} />,
  }),
];

const TableContent = memo(() => {
  const { data: usersData, loading, error } = useQuery(GetUsersDocument, {
    variables: {
      filters: {},
    },
  })
  
  const data: GetUsersQuery['users'] = usersData?.users ?? []
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  if (loading) return <div className="p-4"><LoadingSpinner /></div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <table className="table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr className="border-b border-gray-300" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className="px-2 py-1 text-white" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className="px-2 py-1 text-center" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
    </table>
  )
})

export const Table = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="p-2">
      <TableFilters searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContent />
    </div>
  )
}
