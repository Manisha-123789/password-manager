'use client';
import { apiCall } from '@/src/utils/apiCall';
import { Alert, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const handleSignup = async () => {
    if(!name.length){
      return setError('name is required');
    } else if (!email.length){
return setError('email is required');
    } else if(!password.length){
      return setError('password is required');
    }
   try {
     const response = await apiCall({
      method: 'POST',
      url: 'http://localhost:8000/user/signup',
      body: {
        userName: name,
        email: email,
        password: password,
      },
    });
      console.log(response)
    localStorage.setItem('token', response?.token);
    if (response?.success) {
      router.replace('home');
    } else {
      setError(response.message)
    }
   } catch (error) {
    
   }
  
  };

  useEffect(()=>{
        localStorage.removeItem('token')
    }, [])
  
  return (
    <>
     {isAuthenticated && <> 
    {error && <Alert severity="error">{error}</Alert> } 
     <TextField
        label={'userName'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label={'email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignup}>Create my Account</Button></> }
    </>
  );
};

export default Signup;
