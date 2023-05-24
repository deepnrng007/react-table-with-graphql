import React, { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import TableCount from "./TableCount";
import Loader from "./loader";
import Pagination from "./pagination";

const TableGrid = (props) => {
  const { data, columns, refetch, isLoading, pageChangeHandler } = props;
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns: columnData,
      data: rowData,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const onSort = async (columnName) => {
    await refetch({ limit: 10, offset: 0, sort: columnName });
    gotoPage(0);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="table-container">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((hGroup) => {
                  return (
                    <tr {...hGroup.getHeaderGroupProps()}>
                      {hGroup.headers.map((header) => (
                        <th
                          {...header.getHeaderProps()}
                          onClick={() => {
                            onSort(header.id);
                          }}
                          // onClick={() => header.toggleSortBy(!header.isSortedDesc)}
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
            <Pagination
              pageChangeHandler={pageChangeHandler}
              rowsPerPage={pageSize}
              currentPageIndex={pageIndex}
              totalPageCount={20}
              gotoPage={gotoPage}
            />
            {/* <TableCount
          currentPageIndex={pageIndex}
          totalPageCount={20}
          gotoPage={gotoPage}
          fetchMore={fetchMore}
          pageSize={pageSize}
        /> */}
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
      )}
    </>
  );
};

export default TableGrid;
