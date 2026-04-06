'use client';
import { authService } from '@/src/services/auth.service';
import { Typography } from '@mui/material';
import { useEffect} from 'react';

const VerifyMail = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const response = await authService.getUser({ token: token });
        if (response?.isVerified) {
          localStorage.setItem('authenticate', JSON.stringify(true));
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener('focus', getUser);

    return () => {
      window.removeEventListener('focus', getUser);
    };
  }, []);

  return (
    <>
      <Typography>Verify your email</Typography>
      <Typography>
        We’ve sent a verification link to your email. Please verify your account
        to continue.
      </Typography>
    </>
  );
};

export default VerifyMail;
