/**
 * Category Service
 *
 * Handles all category-related API calls including CRUD operations
 * and hierarchical category management.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS, buildEndpoint } from '@org/config';
import type {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
  CategoryWithChildren,
  CategoryWithCount,
  ApiResponse,
} from '@org/types';

/**
 * Category service object containing all category-related API methods
 */
export const categoryService = {
  /**
   * Get all categories
   *
   * @returns Array of all categories
   */
  async list(): Promise<Category[]> {
    const response = await httpClient.get<ApiResponse<Category[]>>(
      API_ENDPOINTS.categories.list
    );
    return response.data.data;
  },

  /**
   * Get category tree with children
   *
   * @returns Array of top-level categories with nested children
   */
  async listWithChildren(): Promise<CategoryWithChildren[]> {
    const response = await httpClient.get<ApiResponse<CategoryWithChildren[]>>(
      API_ENDPOINTS.categories.list,
      { params: { includeChildren: true } }
    );
    return response.data.data;
  },

  /**
   * Get categories with product counts
   *
   * @returns Array of categories with product counts
   */
  async listWithCounts(): Promise<CategoryWithCount[]> {
    const response = await httpClient.get<ApiResponse<CategoryWithCount[]>>(
      API_ENDPOINTS.categories.list,
      { params: { includeCounts: true } }
    );
    return response.data.data;
  },

  /**
   * Get category by ID
   *
   * @param id - Category ID
   * @returns Category details
   */
  async getById(id: string): Promise<CategoryWithChildren> {
    const response = await httpClient.get<ApiResponse<CategoryWithChildren>>(
      buildEndpoint(API_ENDPOINTS.categories.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Create new category
   *
   * @param data - Category creation data
   * @returns Created category
   */
  async create(data: CategoryCreateInput): Promise<Category> {
    const response = await httpClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.categories.create,
      data
    );
    return response.data.data;
  },

  /**
   * Update category by ID
   *
   * @param id - Category ID
   * @param data - Category update data
   * @returns Updated category
   */
  async update(id: string, data: CategoryUpdateInput): Promise<Category> {
    const response = await httpClient.put<ApiResponse<Category>>(
      buildEndpoint(API_ENDPOINTS.categories.update, { id }),
      data
    );
    return response.data.data;
  },

  /**
   * Delete category by ID
   *
   * @param id - Category ID
   * @returns Success message
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      buildEndpoint(API_ENDPOINTS.categories.delete, { id })
    );
    return response.data.data;
  },
};
