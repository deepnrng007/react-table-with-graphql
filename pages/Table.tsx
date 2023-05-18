import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { COLUMNS } from "../components/columns";
import { useQuery } from "@apollo/client";
import { GET_LAUNCES, GET_USERS } from "../queries/queries";
import TableGrid from "@/components/TableGrid";

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
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCES, {
    variables: {
      limit: 10,
      offset: 0,
    },
    onCompleted: (response) => handleFetchUsersRequestCallback(response, true),
    onError: (response) => handleFetchUsersRequestCallback(response),
  });

  const handleFetchUsersRequestCallback = (
    response: any,
    requestSuccess?: any
  ) => {
    console.log("response", response.launches);

    if (requestSuccess) {
      setTableData(response.launches);
    } else {
      alert("Some error occuredd");
    }
  };

  const gridData = useMemo<Data[]>(() => tableData, [tableData]);

  const fetchMoreData = (offset: Number, limit: Number) => {
    fetchMore({
      variables: {
        limit: gridData.length + 10,
        offset: gridData.length,
      },
    });
  };
  return (
    <div>
      {loading && <div id="loading-container">Loading....</div>}
      {!loading && !error && (
        <TableGrid
          columns={columns}
          data={gridData}
          initialState={initialState}
          fetchMore={fetchMoreData}
        />
      )}
    </div>
  );
};

export default Table;
