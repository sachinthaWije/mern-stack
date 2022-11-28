import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';




export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editTransactions, setEditTransactions] = useState({});

    useEffect(() => {
        fetchTransaction();
    }, [])

    async function fetchTransaction() {
        const res = await fetch('http://localhost:4000/transaction');
        const { data } = await res.json();
        console.log(data);
        setTransactions(data);
    }
    return (
        <Container >
            <TransactionForm fetchTransaction={fetchTransaction}
                editTransactions={editTransactions}
            />
            <TransactionsList transactions={transactions}
                fetchTransaction={fetchTransaction}
                setEditTransactions={setEditTransactions}
            />
        </Container>
    )
}
