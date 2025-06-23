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

const api = new QueryClient()

const axiosInstance = axios.create({
  baseURL: "https://tomcat.sonya.jij.li/internship",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
})

QueryFactory.setAxiosFactory(() => axiosInstance);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={api}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
