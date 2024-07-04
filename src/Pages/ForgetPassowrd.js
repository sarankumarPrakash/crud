
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ForgetPassowrd = () => {
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
          Forgot Password
        </Typography>
        {/* Add your forgot password form here */}
      </Box>
    </Container>
  );
};

export default ForgetPassowrd;
