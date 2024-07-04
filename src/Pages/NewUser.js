
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const NewUser = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
      </Box>
    </Container>
  );
};

export default NewUser;
