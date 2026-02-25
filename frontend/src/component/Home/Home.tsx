'use client';

import { setAuthenticate } from '@/redux/features/auth/authSlice';
import { apiCall } from '@/src/utils/apiCall';
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
  const [data, setData] = useState<PasswordData | {}>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiCall({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_API_URL}/user/password`,
          body: null,
        });
        if (response.status === 200 && response.success) {
          setData(response.data);
        } else {
          setError('Failed to fetch data');
          // router.push("signup");
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Box>
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
      ) : Object.keys(data).length ? (
        <>
          <Typography>Website: {data?.website}</Typography>
          <Typography>User Name: {data?.user_name}</Typography>
        </>
      ) : (
        <Typography>No Data Found</Typography>
      )}
    </>
  );
};
