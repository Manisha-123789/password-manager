'use client'
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Login = () =>{
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    useEffect(()=>{
        localStorage.removeItem('token')
    }, [])
    return (
        <>
            {
                isAuthenticated && <Box>
                    <Typography>Login</Typography>
                    <Button onClick={()=>router.push('signup')}>New User Signup</Button>
                </Box>
                 
            
            }
        </>
        
    )
}

export default Login;