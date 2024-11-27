import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const DataTable = () => {
  // Sample data for the table
  const rows = [
    { id: 1, name: 'File1.txt', date: '2023-01-01', decision: 'Successful', confidence: 'High' },
    { id: 2, name: 'File2.txt', date: '2023-01-02', decision: 'Harmless Error', confidence: 'Low' },
    { id: 3, name: 'File3.txt', date: '2023-01-03', decision: 'Unsuccessful', confidence: 'Medium' },
  ];
  return (
    <TableContainer component={Paper}>
       <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Decision</TableCell> {/* Added Decision column */}
            <TableCell>Confidence</TableCell> {/* Added Confidence column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.decision}</TableCell> {/* Added Decision data */}
              <TableCell>{row.confidence}</TableCell> {/* Added Confidence data */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;