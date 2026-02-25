import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiCallParams {
  method: AxiosRequestConfig['method'];
  url: string;
  body?: any;
}

export const apiCall = async ({ method, url, body }: ApiCallParams): Promise<any> => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  try {
    const response: AxiosResponse = await axiosInstance({
      method,
      url,
      data: body,
    });
    return response.data;
  } catch (error: any) {
    
    return {
      success: false,
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || 'Something went wrong',
      data: null,
    };
  }
};



