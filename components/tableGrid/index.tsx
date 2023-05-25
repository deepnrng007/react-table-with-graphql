import React, { useMemo } from "react";
import { useTable } from "react-table";
import styles from "./styles.module.css";

type TableProps = {
  // using `interface` is also ok
  columns: any;
  data: any;
  isLoading: boolean;
  onSortChanged: any;
};
const TableGrid = ({ columns, data, isLoading, onSortChanged }: TableProps) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: rowData,
    });

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((hGroup) => (
                <tr {...hGroup.getHeaderGroupProps()}>
                  {hGroup.headers.map((header) => (
                    <th
                      {...header.getHeaderProps()}
                      onClick={() => {
                        onSortChanged(header.id);
                      }}
                      // onClick={() => header.toggleSortBy(!header.isSortedDesc)}
                    >
                      {header.render("Header")}
                      <span></span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
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
        </>
      )}
    </>
  );
};

export default TableGrid;
