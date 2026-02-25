'use client'
import { setAuthenticate } from '@/redux/features/auth/authSlice';
import { store } from '@/redux/features/store/store';
import { Header } from '@/src/component/Header/Header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { Provider,  } from 'react-redux';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Provider store={store}>
            <Header/>
            {children}</Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
