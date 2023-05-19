import React, { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import TableCount from "./TableCount";

const TableGrid = (props) => {
  const { data, columns, initialState, fetchMore, refetch } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: initialState,
      autoResetPageIndex: false,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const onSort = async (columnName) => {
    await refetch({ limit: 20, offset: 10, sort: columnName });
    gotoPage(0);
  };

  return (
    <div className="container">
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hGroup) => {
              return (
                <tr {...hGroup.getHeaderGroupProps()}>
                  {hGroup.headers.map((header) => (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      // onClick={() => {
                      //   console.log("clicked", header.id);
                      //   onSort(header.id);

                      // }}
                      onClick={() => header.toggleSortBy(!header.isSortedDesc)}
                    >
                      {header.render("Header")}
                      <span>
                        {header.isSorted
                          ? header.isSortedDesc
                            ? "🔽"
                            : "🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bottom-container">
        <TableCount
          currentPageIndex={pageIndex}
          totalPageCount={pageCount}
          gotoPage={gotoPage}
          fetchMore={fetchMore}
        />
        <div>
          <span className="show-span">{"Show:  "}</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="dropdown"
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
