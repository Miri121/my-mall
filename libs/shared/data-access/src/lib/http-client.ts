/**
 * HTTP Client Module
 *
 * Configured Axios instance with request/response interceptors.
 * Handles authentication, error handling, and logging.
 */

import axios from 'axios';
import { API_BASE_URL, IS_DEV } from '@org/config';
import { getErrorMessage } from '@org/utils';

/**
 * Axios HTTP client instance
 *
 * Pre-configured with base URL, timeout, and interceptors.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 *
 * Attaches authentication token to requests if available.
 * Logs requests in development mode.
 */
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (IS_DEV) {
      console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 *
 * Handles global error responses including 401 Unauthorized.
 * Implements token refresh logic for expired tokens.
 */
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (IS_DEV) {
      console.error('[HTTP Error]', getErrorMessage(error));
    }

    // Handle 401 Unauthorized - token refresh logic
    if (error.response?.status === 401) {
      // TODO: Implement token refresh logic
      // For now, clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
