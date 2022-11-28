import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState, useEffect } from 'react';

export default function TransactionForm({ fetchTransaction, editTransactions }) {
    const initialForm = {
        amount: 0,
        description: "",
        date: new Date()
    };

    const [form, setform] = useState(initialForm);

    useEffect(() => {
        if (editTransactions.amount !== undefined) {
            setform(editTransactions)
        }
    }, [editTransactions])


    function handleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    function handleDate(newValue) {
        setform({ ...form, date: newValue })
    }


    async function habdleSubmit(e) {
        e.preventDefault();
        editTransactions.amount === undefined ? create() : update();

    }

    function reload(res) {
        if (res.ok) {
            setform(initialForm);
            fetchTransaction();
            editTransactions.amount=undefined;
        }
    }

    async function create() {
        const res = await fetch("http://localhost:4000/transaction", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            }
        });

        reload(res);
    }
    async function update() {
        const res = await fetch(`http://localhost:4000/transaction/${editTransactions._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            }
        });

        reload(res);
    }


    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6">
                    Add New Transaction
                </Typography>
                <form onSubmit={habdleSubmit}>
                    <TextField
                        sx={{ marginRight: 5 }}
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        size="small"
                        value={form.amount}
                        name="amount"
                        onChange={handleChange} />
                    <TextField
                        sx={{ marginRight: 5 }}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        size="small"
                        value={form.description}
                        name="description"
                        onChange={handleChange} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Transaction Date"
                            inputFormat="MM/DD/YYYY"
                            onChange={handleDate}
                            value={form.date}
                            name="date"
                            renderInput={(params) =>
                                <TextField
                                    sx={{ marginRight: 5 }}
                                    size="small"
                                    {...params}

                                />}
                        />
                    </LocalizationProvider>
                    {
                        editTransactions.amount !== undefined && (
                            <Button type="submit" variant="outlined">Update</Button>
                        )
                    }
                    {
                        editTransactions.amount === undefined && (
                            <Button type="submit" variant="contained">Submit</Button>
                        )
                    }

                </form>
            </CardContent>
        </Card>
    );
}