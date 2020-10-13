import React, { Component } from "react";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "potentialClients",
    headerName: "potential clients",
    type: "number",
    width: 130,
  },
  { field: "calls", headerName: "Calls", type: "number", width: 130 },
  {
    field: "appointments",
    headerName: "appointments",
    type: "number",
    width: 130,
  },
  { field: "sales", headerName: "Sales", type: "number", width: 130 },
  {
    field: "revenue",
    headerName: "Revenue in dollars",
    type: "number",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    firstName: "Jason",
    lastName: "Chessar",
    email: "test@email.com",
    potentialClients: 23,
    calls: 10,
    appointments: 8,
    sales: 5,
    revenue: 1500,
  },
  {
    id: 2,
    firstName: "Tom",
    lastName: "Cooke",
    email: "test@email.com",
    potentialClients: 134,
    calls: 20,
    appointments: 4,
    sales: 4,
    revenue: 8000,
  },
  {
    id: 3,
    firstName: "Katarina",
    lastName: "Labudova",
    email: "test@email.com",
    potentialClients: 80,
    calls: 6,
    appointments: 2,
    sales: 2,
    revenue: 200,
  },
  {
    id: 4,
    firstName: "Richard",
    lastName: "Morgan",
    email: "test@email.com",
    potentialClients: 40,
    calls: 15,
    appointments: 1,
    sales: 1,
    revenue: 800,
  },
  {
    id: 5,
    firstName: "Felipe",
    lastName: "Bianchi",
    email: "test@email.com",
    potentialClients: 85,
    calls: 15,
    appointments: 8,
    sales: 7,
    revenue: 2300,
  },
];

const Dashboard = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};
export default withRouter(Dashboard);
