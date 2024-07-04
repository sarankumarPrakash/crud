// src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/api/data');
    setData(result.data);
  };

  const handleClickOpen = (index = null) => {
    if (index !== null) {
      setEditIndex(index);
      reset(data[index]);
    } else {
      setEditIndex(null);
      reset({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    if (editIndex !== null) {
      const updatedData = await axios.put(`http://localhost:5000/api/data/${editIndex}`, formData);
      const newData = [...data];
      newData[editIndex] = updatedData.data;
      setData(newData);
    } else {
      const newData = await axios.post('http://localhost:5000/api/data', formData);
      setData([...data, newData.data]);
    }
    handleClose();
  };

  const handleDelete = async (index) => {
    await axios.delete(`http://localhost:5000/api/data/${index}`);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        Add New
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? data.map((row, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(index)} sx={{ mr: 1 }}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                  <Typography>There is no data to show</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              {...register('name', { required: 'Name is required' })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editIndex !== null ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Home;
