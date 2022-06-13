import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const CustomerInvoice = ({ appData }) => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [customer, setCustomer] = useState([]);
  const date = Date.now();

  useEffect(() => {
    const customer = appData.customers.find((customer) => customer.id === +id);
    const invoice = appData.packages.filter((p) => p.customerid === +id);
    setCustomer(customer);
    setInvoice(invoice);
  }, [appData, id]);
  
  return (
    <div className="invoice-page">
      <div className="invoice-header">
        <div className="row">
          <h3 className="date">{new Date().toISOString().split("T")[0]}</h3>
          <h2 className="page-title">Invoice</h2>
        </div>
        <div className="row">
          <h3 className="name">{customer?.name}</h3>
          <h4 className="id">No.{date}</h4>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell className="price">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice &&
              invoice.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="id">
                      {row.id}
                    </TableCell>
                    <TableCell className="weight">{row.weight}</TableCell>
                    <TableCell className="price">{row.price}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="total"
                  >
                    <TableCell component="th" scope="row">
                      Total:
                    </TableCell>
                    <TableCell className="weight">
                      {
                        invoice && invoice.reduce((acc, curr) => {
                          return acc + +curr.weight.slice(0, -2); // acc is the total weight
                        }, 0)
                      }
                      kg
                    </TableCell>
                    <TableCell className="price">
                    {
                        invoice && invoice.reduce((acc, curr) => {
                          return acc + +curr.price; // acc is the total weight
                        }, 0)
                      }
                    </TableCell>
                  </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerInvoice;
