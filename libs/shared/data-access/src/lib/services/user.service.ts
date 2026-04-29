/**
 * User Service
 *
 * Handles all user-related API calls including CRUD operations,
 * profile management, and avatar uploads.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS, buildEndpoint } from '@org/config';
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
  ProfileUpdateFormData,
  PaginatedResponse,
  ApiResponse,
  QueryParams,
} from '@org/types';

/**
 * User service object containing all user-related API methods
 */
export const userService = {
  /**
   * Get paginated list of users
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated user list
   */
  async list(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await httpClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.users.list,
      { params }
    );
    return response.data;
  },

  /**
   * Get user by ID
   *
   * @param id - User ID
   * @returns User details
   */
  async getById(id: string): Promise<User> {
    const response = await httpClient.get<ApiResponse<User>>(
      buildEndpoint(API_ENDPOINTS.users.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Get current user profile
   *
   * @returns Current user details
   */
  async getMe(): Promise<User> {
    const response = await httpClient.get<ApiResponse<User>>(
      API_ENDPOINTS.users.me
    );
    return response.data.data;
  },

  /**
   * Create new user (Admin only)
   *
   * @param data - User creation data
   * @returns Created user
   */
  async create(data: UserCreateInput): Promise<User> {
    const response = await httpClient.post<ApiResponse<User>>(
      API_ENDPOINTS.users.list,
      data
    );
    return response.data.data;
  },

  /**
   * Update user by ID (Admin only)
   *
   * @param id - User ID
   * @param data - User update data
   * @returns Updated user
   */
  async update(id: string, data: UserUpdateInput): Promise<User> {
    const response = await httpClient.put<ApiResponse<User>>(
      buildEndpoint(API_ENDPOINTS.users.update, { id }),
      data
    );
    return response.data.data;
  },

  /**
   * Update current user profile
   *
   * @param data - Profile update data
   * @returns Updated user
   */
  async updateMe(data: ProfileUpdateFormData): Promise<User> {
    const response = await httpClient.put<ApiResponse<User>>(
      API_ENDPOINTS.users.updateMe,
      data
    );
    return response.data.data;
  },

  /**
   * Delete user by ID (Admin only)
   *
   * @param id - User ID
   * @returns Success message
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      buildEndpoint(API_ENDPOINTS.users.delete, { id })
    );
    return response.data.data;
  },

  /**
   * Delete current user account
   *
   * @returns Success message
   */
  async deleteMe(): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.users.deleteMe
    );
    return response.data.data;
  },

  /**
   * Upload user avatar
   *
   * @param file - Image file to upload
   * @returns Updated user with new avatar URL
   */
  async uploadAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await httpClient.post<ApiResponse<User>>(
      API_ENDPOINTS.users.uploadAvatar,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },
};
