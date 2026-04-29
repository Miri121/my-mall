/**
 * Store Service
 *
 * Handles all store-related API calls including CRUD operations,
 * product management, and image uploads.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS, buildEndpoint } from '@org/config';
import type {
  Store,
  StoreCreateInput,
  StoreUpdateInput,
  StoreWithVendor,
  StoreWithStats,
  Product,
  PaginatedResponse,
  ApiResponse,
  QueryParams,
} from '@org/types';

/**
 * Store service object containing all store-related API methods
 */
export const storeService = {
  /**
   * Get paginated list of stores
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated store list
   */
  async list(params?: QueryParams): Promise<PaginatedResponse<Store>> {
    const response = await httpClient.get<PaginatedResponse<Store>>(
      API_ENDPOINTS.stores.list,
      { params }
    );
    return response.data;
  },

  /**
   * Get store by ID
   *
   * @param id - Store ID
   * @returns Store details
   */
  async getById(id: string): Promise<StoreWithVendor> {
    const response = await httpClient.get<ApiResponse<StoreWithVendor>>(
      buildEndpoint(API_ENDPOINTS.stores.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Get store by URL slug
   *
   * @param slug - Store URL slug
   * @returns Store details
   */
  async getBySlug(slug: string): Promise<StoreWithVendor> {
    const response = await httpClient.get<ApiResponse<StoreWithVendor>>(
      buildEndpoint(API_ENDPOINTS.stores.bySlug, { slug })
    );
    return response.data.data;
  },

  /**
   * Get store with statistics
   *
   * @param id - Store ID
   * @returns Store with statistics
   */
  async getWithStats(id: string): Promise<StoreWithStats> {
    const response = await httpClient.get<ApiResponse<StoreWithStats>>(
      buildEndpoint(API_ENDPOINTS.stores.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Get all products for a store
   *
   * @param id - Store ID
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated product list
   */
  async getProducts(
    id: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Product>> {
    const response = await httpClient.get<PaginatedResponse<Product>>(
      buildEndpoint(API_ENDPOINTS.stores.products, { id }),
      { params }
    );
    return response.data;
  },

  /**
   * Create new store
   *
   * @param data - Store creation data
   * @returns Created store
   */
  async create(data: StoreCreateInput): Promise<Store> {
    const response = await httpClient.post<ApiResponse<Store>>(
      API_ENDPOINTS.stores.create,
      data
    );
    return response.data.data;
  },

  /**
   * Update store by ID
   *
   * @param id - Store ID
   * @param data - Store update data
   * @returns Updated store
   */
  async update(id: string, data: StoreUpdateInput): Promise<Store> {
    const response = await httpClient.put<ApiResponse<Store>>(
      buildEndpoint(API_ENDPOINTS.stores.update, { id }),
      data
    );
    return response.data.data;
  },

  /**
   * Delete store by ID
   *
   * @param id - Store ID
   * @returns Success message
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      buildEndpoint(API_ENDPOINTS.stores.delete, { id })
    );
    return response.data.data;
  },

  /**
   * Upload store logo
   *
   * @param id - Store ID
   * @param file - Image file to upload
   * @returns Updated store with new logo URL
   */
  async uploadLogo(id: string, file: File): Promise<Store> {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await httpClient.post<ApiResponse<Store>>(
      buildEndpoint(API_ENDPOINTS.stores.uploadLogo, { id }),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  /**
   * Upload store cover image
   *
   * @param id - Store ID
   * @param file - Image file to upload
   * @returns Updated store with new cover URL
   */
  async uploadCover(id: string, file: File): Promise<Store> {
    const formData = new FormData();
    formData.append('cover', file);

    const response = await httpClient.post<ApiResponse<Store>>(
      buildEndpoint(API_ENDPOINTS.stores.uploadCover, { id }),
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
