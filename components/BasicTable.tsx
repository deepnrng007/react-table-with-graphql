import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import Pagination from "./pagination";

const BasicTable = (props) => {
  const { refetch, isLoading, fetchMore } = props;
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const pageChangeHandler = (pageNumber) => {
    setPageIndex(pageNumber);
    fetchMore({
      variables: {
        limit: pageNumber * 10 + pageSize,
        offset: pageNumber * 10,
      },
    });
  };
  console.log("dadadada", props.data, data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="table-container">
      <h2>Basict Table</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bottom-container">
        <Pagination
          pageChangeHandler={pageChangeHandler}
          rowsPerPage={pageSize}
          currentPageIndex={pageIndex}
          totalPageCount={20}
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
  );
};

export default BasicTable;
