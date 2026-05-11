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
  const auth = JSON.parse(localStorage.getItem('auth') ?? 'null')?.state;
  const accessToken = auth?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('auth');
    window.location.href = paths.auth.login.getHref();
  }
})
