'use client';
import { validate } from '@/src/lib/helperFunc';
import { authService } from '@/src/services/auth.service';
import { Alert, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [apiError, setApiError] = useState('');
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const handleChange = (field: string, value : string) =>{
    setForm((prev)=>({
      ...prev,
      [field] : value
    }))
    setErrors((prev)=>({
      ...prev,
      [field]: " "
    }))
  }

 

  const handleSignup = async () => {
    const error = validate(form.userName, form.email, form.password);
    if(error.userName || error.password || error.email){
     return setErrors(error);
    }
    try {
      const response = await authService.signup({
        userName: form.userName,
        email: form.email,
        password: form.password,
      });
      console.log(response)
      localStorage.setItem('token', response?.data?.token);
      if (response?.success) {
        router.push('verify-mail');
      } 
    } catch (error: any) {
      const apiError = error?.response?.data;
      setApiError(apiError?.message ?? 'Something went wrong')
    }
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('authenticate');
  }, []);

  return (
    <>
      {!isAuthenticated && (
        <>
          {apiError && <Alert severity="error">{apiError}</Alert>}
          <TextField
            label={'userName'}
            value={form.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            helperText={errors.userName}
          />
          <TextField
            label={'email'}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            helperText={errors.email}
          />
          <TextField
            name='password'
            label={'password'}
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            helperText={errors.password}
          />
          <Button type='submit' onClick={handleSignup}>Create my Account</Button>
          <Button onClick={()=>router.push('login')}>Already have an account? Log in</Button>
        </>
      )}
    </>
  );
};

export default Signup;
