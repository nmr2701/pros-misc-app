import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { api } from '~/utils/api';

const DataTable = () => {
  // Sample data for the table
  const { data: rows = [], isLoading } = api.post.getFiles.useQuery(); // Fetch data from the database


  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }



  const sortedRows = rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Misconduct Type</TableCell>
            <TableCell>Verdict</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell> {/* Format date to show only the date */}
              <TableCell>{row.misconductType}</TableCell> {/* Assuming misconductType is the confidence */}
              <TableCell>{row.verdict}</TableCell> {/* Assuming verdict is the decision */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;