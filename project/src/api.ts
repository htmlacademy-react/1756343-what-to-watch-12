import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {toast} from 'react-toastify';
import { getToken } from './token';

const BACKEND_URL = 'https://12.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        toast.error(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
