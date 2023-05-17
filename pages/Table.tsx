import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { COLUMNS } from "../components/columns";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries/queries";
import TableGrid from "@/components/TableGrid";

export type Data = {
  id: Number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: Number;
  country: string;
  phone: string;
};

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const columns = useMemo<Column<Data>[]>(() => COLUMNS, []);

  const initialState = {
    sortBy: [
      {
        id: "id",
        desc: false,
      },
    ],
  };
  const { loading, error, data } = useQuery(GET_USERS, {
    onCompleted: (response) => handleFetchUsersRequestCallback(response, true),
    onError: (response) => handleFetchUsersRequestCallback(response),
  });

  const handleFetchUsersRequestCallback = (
    response: any,
    requestSuccess?: any
  ) => {
    if (requestSuccess) {
      setTableData(response.users);
    } else {
      alert("Some error occuredd");
    }
  };

  const gridData = useMemo<Data[]>(() => tableData, [tableData]);

  return (
    <div>
      {loading && <div id="loading-container">Loading....</div>}
      {!loading && !error && (
        <TableGrid
          columns={columns}
          data={gridData}
          initialState={initialState}
        />
      )}
    </div>
  );
};

export default Table;
