import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

import { AppRouter } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryFactory } from '../services/api'
import axios from 'axios'
import { redirectToLogin } from './navigation/navigation.ts'
import { NavigationHandler } from './navigation/NavigationHandler.tsx'

const api = new QueryClient()

const axiosInstance = axios.create({
  baseURL: "https://tomcat.sonya.jij.li/internship",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

QueryFactory.setAxiosFactory(() => axiosInstance);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={api}>
        <BrowserRouter>
          <NavigationHandler />
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
