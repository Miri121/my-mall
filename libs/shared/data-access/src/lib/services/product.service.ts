/**
 * Product Service
 *
 * Handles all product-related API calls including CRUD operations,
 * filtering, and image management.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS, buildEndpoint } from '@org/config';
import type {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
  ProductWithDetails,
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
  QueryParams,
} from '@org/types';

/**
 * Product service object containing all product-related API methods
 */
export const productService = {
  /**
   * Get paginated list of products
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated product list
   */
  async list(params?: QueryParams): Promise<PaginatedResponse<Product>> {
    const response = await httpClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.products.list,
      { params }
    );
    return response.data;
  },

  /**
   * Get filtered products
   *
   * @param filters - Product filter criteria
   * @returns Paginated product list
   */
  async filter(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await httpClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.products.list,
      { params: filters }
    );
    return response.data;
  },

  /**
   * Get product by ID
   *
   * @param id - Product ID
   * @returns Product details
   */
  async getById(id: string): Promise<ProductWithDetails> {
    const response = await httpClient.get<ApiResponse<ProductWithDetails>>(
      buildEndpoint(API_ENDPOINTS.products.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Create new product
   *
   * @param data - Product creation data
   * @returns Created product
   */
  async create(data: ProductCreateInput): Promise<Product> {
    const response = await httpClient.post<ApiResponse<Product>>(
      API_ENDPOINTS.products.create,
      data
    );
    return response.data.data;
  },

  /**
   * Update product by ID
   *
   * @param id - Product ID
   * @param data - Product update data
   * @returns Updated product
   */
  async update(id: string, data: ProductUpdateInput): Promise<Product> {
    const response = await httpClient.put<ApiResponse<Product>>(
      buildEndpoint(API_ENDPOINTS.products.update, { id }),
      data
    );
    return response.data.data;
  },

  /**
   * Delete product by ID
   *
   * @param id - Product ID
   * @returns Success message
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      buildEndpoint(API_ENDPOINTS.products.delete, { id })
    );
    return response.data.data;
  },

  /**
   * Upload product images
   *
   * @param id - Product ID
   * @param files - Array of image files to upload
   * @returns Updated product with new images
   */
  async uploadImages(id: string, files: File[]): Promise<Product> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await httpClient.post<ApiResponse<Product>>(
      buildEndpoint(API_ENDPOINTS.products.uploadImages, { id }),
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
   * Delete product image
   *
   * @param id - Product ID
   * @param imageId - Image ID to delete
   * @returns Updated product without deleted image
   */
  async deleteImage(id: string, imageId: string): Promise<Product> {
    const response = await httpClient.delete<ApiResponse<Product>>(
      buildEndpoint(API_ENDPOINTS.products.deleteImage, { id, imageId })
    );
    return response.data.data;
  },
};
