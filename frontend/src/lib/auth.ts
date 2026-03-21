"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticate } from '../redux/features/auth/authSlice';


export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setAuthenticate(true));
    } else {
      console.log('logout')
    }
  }, []);
};