import React, { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import { COLUMNS } from "../components/tableGrid/columns";
import { useQuery } from "@apollo/client";
import { GET_LAUNCES, GET_USERS } from "../queries/queries";
import TableGrid from "@/components/tableGrid";
import Pagination from "@/components/pagination";

// export type Data = {
//   id: Number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   date_of_birth: string;
//   age: Number;
//   country: string;
//   phone: string;
// };
export type Data = {
  mission_name: string;
  mission_id: string;
};

const Table = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const columns = useMemo<Column<Data>[]>(() => COLUMNS, []);
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 150,
  });

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_LAUNCES, {
    variables: {
      limit: 10,
      offset: 0,
      sort: "asc",
    },
    onCompleted: (response) => handleFetchUsersRequestCallback(response, true),
    onError: (response) => handleFetchUsersRequestCallback(response),
  });

  const handleFetchUsersRequestCallback = (
    response: any,
    requestSuccess?: any
  ) => {
    if (requestSuccess) {
      console.log("coming innnnnn", response.launches);

      setPageData({
        isLoading: false,
        rowData: response.launches,
        totalPages: 20,
        totalPassengers: 200,
      });
    } else {
      alert("Some error occuredd");
    }
  };

  const onSort = async (columnName: number) => {
    refetch({ limit: 10, offset: 0, sort: `${columnName}:asc` });
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchMore({
      variables: {
        limit: currentPage * 10 + pageSize,
        offset: currentPage * 10,
      },
    });
  }, [pageSize, currentPage]);

  return (
    <div>
      {loading && <div id="loading-container">Loading....</div>}
      {!loading && !error && (
        <>
          <TableGrid
            columns={columns}
            data={pageData.rowData}
            isLoading={pageData.isLoading}
            onSortChanged={onSort}
          />
          <div className="bottom-container">
            <Pagination
              pageChangeHandler={setCurrentPage}
              rowsPerPage={pageSize}
              currentPageIndex={currentPage}
              totalRows={200}
            />
            <div>
              <span className="show-span">{"Show:  "}</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
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
        </>
      )}
    </div>
  );
};

export default Table;
