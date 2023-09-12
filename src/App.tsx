/* eslint-disable @typescript-eslint/no-magic-numbers */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DecodedToken } from './common/decodedToken.types';
import { ContentPage } from './pages/ContentPage';

export function App() {
  useEffect(() => {
    // Add a request interceptor
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (!token) {
          return config;
        }
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken && decodedToken.exp > Date.now() / 1000) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Remove the request interceptor on component unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={<ContentPage />}
      />
    </Routes>
  );
}
