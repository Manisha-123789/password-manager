"use client";

import { Provider } from "react-redux";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { store } from '../redux/store';

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </AppRouterCacheProvider>
  );
}