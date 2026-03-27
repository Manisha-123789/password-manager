'use client';

import { authService } from '@/src/services/auth.service';
import { Box, Typography } from '@mui/material';

import { use, useEffect } from 'react';


export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);


  useEffect(() => {
    if (!slug) return;
    const verifyToken = async () => {
      try {
        const response = await authService.verifyEmail(slug);
        const token = response.token;
        localStorage.setItem('token', token);
        setTimeout(() => {
          window.close();
        }, 3000);
      } catch (error) {}
    };
    verifyToken();
  }, [slug]);

  return (
    <Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Box>
          <Typography>Email Verified Successfully</Typography>
        </Box>
        <Box>
          <Typography>
            Your email has been successfully verified. You can now return to
            your main tab.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
