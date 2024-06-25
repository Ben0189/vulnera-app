//TODO : Gold plating combine all table list component into dynamic table by passing param into table for different page table

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProjectListDTO } from '@models/ProjectListDTO';

interface ProjectTableProps {
  rows: ProjectListDTO[];
}

export default function BasicTable({rows}: ProjectTableProps) {
  return ( 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">Company Name</TableCell>
                <TableCell align="left">Budget</TableCell>
                <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>    
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.companyName}</TableCell>
              <TableCell >{row.budget}</TableCell>
              <TableCell >{row.description}</TableCell>
              {/* dangerouslySetInnerHTML={{ __html: "<script>alert('Hello! I am an alert box!');</script>"}} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}