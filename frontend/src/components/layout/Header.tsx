'use client';
import { useAuth } from '@/src/lib/auth';
import { Box, Typography } from '@mui/material';

export const Header = () => {
  useAuth();

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} marginBottom={'30px'}>
        <Typography variant="h5">SecureVault</Typography>
      </Box>
    </>
  );
};
