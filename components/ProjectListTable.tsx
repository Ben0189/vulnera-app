//TODO : Gold plating combine all table list component into dynamic table by passing param into table for different page table

import { ProjectListDTO } from '@models/ProjectListDTO';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InnerHTML from 'dangerously-set-html-content';


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
              <TableCell>    
                <InnerHTML html={row.description} />
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

