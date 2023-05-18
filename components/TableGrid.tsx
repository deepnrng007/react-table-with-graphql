import React, { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import TableCount from "./TableCount";

const TableGrid = (props) => {
  const { data, columns, initialState, fetchMore } = props;
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
    usePagination
  );

  const pCount = 205 / 10;
  const { pageIndex, pageSize } = state;
  console.log("pageindex", pageIndex, pageCount);
  return (
    <div className="container">
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hGroup) => {
              return (
                <tr {...hGroup.getHeaderGroupProps()}>
                  {hGroup.headers.map((header) => (
                    <th {...header.getHeaderProps()}>
                      {header.render("Header")}
                      {/* <span>
                      {header.isSorted
                        ? header.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span> */}
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
          fetchmore={fetchMore(pageIndex * 10 + 1, pageIndex * 10 + 10)}
        />
        {/* <div>
          <button onClick={() => gotoPage(0)}>{"<<"}</button>
          <button
            onClick={() => {
              return previousPage();
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              gotoPage(pageIndex + 1);
              // nextPage();
              fetchMore(pageIndex * 10 + 1, pageIndex * 10 + 10);
            }}
          >
            Next
          </button>
          <button disabled={!canNextPage} onClick={() => gotoPage(pCount - 1)}>
            {">>"}
          </button>
        </div> */}
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
