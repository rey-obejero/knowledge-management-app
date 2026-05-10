import axios from 'axios';
import { paths } from '@/config/paths';

const API_BASE_URL = 'https://localhost:7100/api';

export const apiClient = axios.create(
  {
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('accessToken');
    window.location.href = paths.auth.login.getHref();
  }
})
