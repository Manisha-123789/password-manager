'use client';
import { loginValidate} from '@/src/lib/helperFunc';
import { authService } from '@/src/services/auth.service';
import { Alert, Box, Button, TextField} from '@mui/material';
import { useRouter } from 'next/navigation';

import {useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));

    setApiError('');
  };

  const handleLogin = async ( e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const error = loginValidate(form.email, form.password);
    if (error.email || error.password) {
      setErrors(error);
    } else {
      try {
        const response = await authService.login(form);
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('authenticate', JSON.stringify(true));
        router.push('/');
      } catch (error : any) {
        console.log(error?.response);
        setApiError(error.response.data.message ?? 'Something went wrong')
      }
    }
  };

  return (
    <>
      <Box>
        {apiError && <Alert severity="error">{apiError}</Alert>}
        <TextField
          label={'email'}
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          helperText={errors.email}
        />
        <TextField
          label={'password'}
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          helperText={errors.password}
        />
        <Button  onClick={handleLogin}>Login</Button>

        <Button onClick={() => router.push('signup')}>New User Signup</Button>
      </Box>
    </>
  );
};

export default Login;
