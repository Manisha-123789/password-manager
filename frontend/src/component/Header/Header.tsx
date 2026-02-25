'use client'
import { setAuthenticate } from '@/redux/features/auth/authSlice';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const Header = () => {
const dispatch = useDispatch();
const router = useRouter();
     useEffect(()=>{
     const token = localStorage.getItem("token");
        if (token) {
          dispatch(setAuthenticate(true));
        }else {
        //   router.push("login"); 
        }
      }, [])
  return (
    <>
      <Box display={'flex'} justifyContent={'center'} marginBottom={'30px'}>
        <Typography variant='h5'>Password Manager</Typography>
      </Box>
    </>
  );
};
