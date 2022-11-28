import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';



export default function TransactionsList({ transactions, fetchTransaction, setEditTransactions }) {

  async function remove(_id) {
    if (!window.confirm('Are you sure')) return;
    
   const res= await fetch(`http://localhost:4000/transaction/${_id}`,{
      method: "DELETE"
    });

    if(res.ok){
      window.alert("Deleted Successfully");
      fetchTransaction();
    }
  }

  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Transaction List
      </Typography>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Descrption</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{formatDate(row.date)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" component="label" onClick={() => setEditTransactions(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}