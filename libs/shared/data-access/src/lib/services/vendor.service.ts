/**
 * Vendor Service
 *
 * Handles all vendor-related API calls including CRUD operations,
 * statistics, and store management.
 */

import { httpClient } from '../http-client.js';
import { API_ENDPOINTS, buildEndpoint } from '@org/config';
import type {
  Vendor,
  VendorCreateInput,
  VendorUpdateInput,
  VendorWithStats,
  Store,
  PaginatedResponse,
  ApiResponse,
  QueryParams,
} from '@org/types';

/**
 * Vendor service object containing all vendor-related API methods
 */
export const vendorService = {
  /**
   * Get paginated list of vendors
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated vendor list
   */
  async list(params?: QueryParams): Promise<PaginatedResponse<Vendor>> {
    const response = await httpClient.get<PaginatedResponse<Vendor>>(
      API_ENDPOINTS.vendors.list,
      { params }
    );
    return response.data;
  },

  /**
   * Get vendor by ID
   *
   * @param id - Vendor ID
   * @returns Vendor details
   */
  async getById(id: string): Promise<Vendor> {
    const response = await httpClient.get<ApiResponse<Vendor>>(
      buildEndpoint(API_ENDPOINTS.vendors.detail, { id })
    );
    return response.data.data;
  },

  /**
   * Get vendor with statistics
   *
   * @param id - Vendor ID
   * @returns Vendor with statistics
   */
  async getStats(id: string): Promise<VendorWithStats> {
    const response = await httpClient.get<ApiResponse<VendorWithStats>>(
      buildEndpoint(API_ENDPOINTS.vendors.stats, { id })
    );
    return response.data.data;
  },

  /**
   * Get all stores for a vendor
   *
   * @param id - Vendor ID
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated store list
   */
  async getStores(
    id: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Store>> {
    const response = await httpClient.get<PaginatedResponse<Store>>(
      buildEndpoint(API_ENDPOINTS.vendors.stores, { id }),
      { params }
    );
    return response.data;
  },

  /**
   * Create new vendor
   *
   * @param data - Vendor creation data
   * @returns Created vendor
   */
  async create(data: VendorCreateInput): Promise<Vendor> {
    const response = await httpClient.post<ApiResponse<Vendor>>(
      API_ENDPOINTS.vendors.create,
      data
    );
    return response.data.data;
  },

  /**
   * Update vendor by ID
   *
   * @param id - Vendor ID
   * @param data - Vendor update data
   * @returns Updated vendor
   */
  async update(id: string, data: VendorUpdateInput): Promise<Vendor> {
    const response = await httpClient.put<ApiResponse<Vendor>>(
      buildEndpoint(API_ENDPOINTS.vendors.update, { id }),
      data
    );
    return response.data.data;
  },

  /**
   * Delete vendor by ID
   *
   * @param id - Vendor ID
   * @returns Success message
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await httpClient.delete<ApiResponse<{ message: string }>>(
      buildEndpoint(API_ENDPOINTS.vendors.delete, { id })
    );
    return response.data.data;
  },
};
