import { Column } from "react-table";
import { Data } from "../pages/Table";

interface ColumnType {
  col1: string;
  col2: string;
}

export const COLUMNS: Column<Data>[] = [
  {
    Header: "Mission ID",
    accessor: "mission_id",
  },
  {
    Header: "Mission Name",
    accessor: "mission_name",
  },
];
// export const COLUMNS: Column<Data>[] = [
//   {
//     Header: "Id",
//     accessor: "id",
//   },
//   {
//     Header: "First Name",
//     accessor: "first_name",
//   },
//   {
//     Header: "Last Name",
//     accessor: "last_name",
//   },
//   {
//     Header: "Date Of Birth",
//     accessor: "date_of_birth",
//   },
//   {
//     Header: "Country",
//     accessor: "country",
//   },
//   {
//     Header: "Phone",
//     accessor: "phone",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Age",
//     accessor: "age",
//   },
// ];
