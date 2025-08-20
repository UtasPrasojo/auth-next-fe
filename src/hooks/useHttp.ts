import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';

interface UseHttpReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (config: AxiosRequestConfig) => Promise<T>;
}

export const useHttp = <T = any>(): UseHttpReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (config: AxiosRequestConfig): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const response: AxiosResponse<T> = await axios({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        timeout: 10000,
        ...config,
      });
      
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};