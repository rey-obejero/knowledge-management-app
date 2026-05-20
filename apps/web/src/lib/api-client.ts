import axios from 'axios';
import { paths } from '@/config/paths';

const API_BASE_URL = 'https://localhost:7100/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const authentication = JSON.parse(
    localStorage.getItem('authentication') ?? 'null',
  )?.state;
  const accessToken = authentication?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authentication');
      window.location.href = paths.authentication.signIn.getHref();
    }
  },
);
