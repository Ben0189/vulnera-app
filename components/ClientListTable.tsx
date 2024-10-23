import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ClientListDTO } from '@models/ClientListDTO';

interface ClientTableProps {
  rows: ClientListDTO[];
}

export default function BasicTable({rows}: ClientTableProps) {

  return ( 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
                <TableCell  align="left">Name</TableCell>
                <TableCell  align="left">Email</TableCell>
                <TableCell  align="left">Contact</TableCell>
                <TableCell  align="left">Revenue</TableCell>
                <TableCell  align="left">Credit Card Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell >{row.Email}</TableCell>
              <TableCell >{row.Contact}</TableCell>
              <TableCell >{row.Revenue}</TableCell>
              <TableCell >{row.CreditCardNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}