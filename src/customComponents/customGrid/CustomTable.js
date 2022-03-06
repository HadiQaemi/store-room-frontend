import CIcon from '@coreui/icons-react'
import React from 'react'
import { useTable, usePagination } from 'react-table'
import {
  cilChevronRight,
  cilChevronDoubleRight,
  cilChevronLeft,
  cilChevronDoubleLeft,
} from '@coreui/icons'

export function CustomTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination,
  )
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <CIcon icon={cilChevronDoubleRight} size="lg" />
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <CIcon icon={cilChevronRight} size="lg" />
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <CIcon icon={cilChevronLeft} size="lg" />
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <CIcon icon={cilChevronDoubleLeft} size="lg" />
        </button>{' '}
        <span>
          صفحه{' '}
          <strong>
            {pageIndex + 1} از {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | رفتن به صفحه:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              نمایش {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
