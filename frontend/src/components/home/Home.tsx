'use client';

import { userService } from '@/src/services/user.service';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface PasswordData {
  website: string;
  user_name: string;
  // password: string; // Do not display this!
}

export const Home = () => {
  const [data, setData] = useState<PasswordData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticate] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isVerified = localStorage.getItem('authenticate');
    const token = localStorage.getItem('token');
    if (isVerified && token) {
      setIsAuthenticate(JSON.parse(isVerified));
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchUserData = async () => {
      try {
        const response = await userService.getPasswords();
        if (response.status === 200 && response.success) {
          setData(response.data);
        } else {
          setError('Failed to fetch data');
          // router.push("signup");
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated ? (
        <Box>
          {error && <Alert>{error}</Alert>}
          <Typography>SecureVault</Typography>
          <Typography>
            Your Passwords. Protected. Organized. Accessible. Manage all your
            passwords safely in one secure place. SecureVault helps you store,
            organize, and access your credentials anytime — without remembering
            dozens of passwords.
          </Typography>
          <Button onClick={() => router.push('signup')}>Create Account</Button>
          <Button onClick={() => router.push('login')}>Login</Button>
        </Box>
      ) : data && Object.keys(data).length ? (
        <>
          <Typography>Website: {data?.website}</Typography>
          <Typography>User Name: {data?.user_name}</Typography>
        </>
      ) : (
        <>
          <Typography>Your vault is empty</Typography>
          <Typography>
            Save your passwords here to keep them safe and easy to access
            anytime.
          </Typography>
        </>
      )}
    </>
  );
};
