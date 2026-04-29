/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including login,
 * registration, password management, and user profile.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS } from '@org/config';
import type {
  User,
  LoginFormData,
  RegisterFormData,
  ApiResponse,
} from '@org/types';

/**
 * Authentication service object containing all auth-related API methods
 */
export const authService = {
  /**
   * Login with email and password
   *
   * @param data - Login credentials
   * @returns User data and authentication token
   */
  async login(
    data: LoginFormData
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.login, data);
    return response.data;
  },

  /**
   * Login with Google OAuth
   *
   * @param token - Google OAuth token
   * @returns User data and authentication token
   */
  async loginWithGoogle(
    token: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.loginWithGoogle, {
      token,
    });
    return response.data;
  },

  /**
   * Register new user account
   *
   * @param data - Registration data
   * @returns User data and authentication token
   */
  async register(
    data: RegisterFormData
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.register, data);
    return response.data;
  },

  /**
   * Logout current user
   *
   * @returns Success message
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.logout);
    return response.data;
  },

  /**
   * Refresh authentication token
   *
   * @returns New authentication token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.refreshToken);
    return response.data;
  },

  /**
   * Request password reset email
   *
   * @param email - User's email address
   * @returns Success message
   */
  async resetPassword(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.resetPassword, {
      email,
    });
    return response.data;
  },

  /**
   * Update password with reset token
   *
   * @param token - Password reset token
   * @param password - New password
   * @returns Success message
   */
  async updatePassword(
    token: string,
    password: string
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await httpClient.post(API_ENDPOINTS.auth.updatePassword, {
      token,
      password,
    });
    return response.data;
  },

  /**
   * Get current authenticated user profile
   *
   * @returns Current user data
   */
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<ApiResponse<User>>(
      API_ENDPOINTS.auth.me
    );
    return response.data.data;
  },
};
