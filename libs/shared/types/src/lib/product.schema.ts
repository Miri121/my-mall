import { z } from 'zod';

/**
 * Product Schema
 * Represents a product entity with pricing validation
 */
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Product name is required').max(300),
  description: z.string().max(2000).optional().nullable(),
  price: z.number().positive('Price must be greater than 0'),
  comparePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).default([]),
  categoryId: z.string().uuid().optional().nullable(),
  storeId: z.string().uuid(),
  vendorId: z.string().uuid(),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).refine(
  (data) => {
    // If comparePrice exists, it must be greater than price
    if (data.comparePrice) {
      return data.comparePrice > data.price;
    }
    return true;
  },
  {
    message: 'Compare price must be greater than price',
    path: ['comparePrice'],
  }
);

export type Product = z.infer<typeof ProductSchema>;

/**
 * Product Create Input Schema
 * Used when creating a new product (Vendor only)
 */
export const ProductCreateInputSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(300),
  description: z.string().max(2000).optional(),
  price: z.number().positive('Price must be greater than 0'),
  comparePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).optional().default([]),
  categoryId: z.string().uuid().optional().nullable(),
  storeId: z.string().uuid('Valid store ID is required'),
  isActive: z.boolean().optional().default(true),
}).refine(
  (data) => {
    if (data.comparePrice) {
      return data.comparePrice > data.price;
    }
    return true;
  },
  {
    message: 'Compare price must be greater than price',
    path: ['comparePrice'],
  }
);

export type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>;

/**
 * Product Update Input Schema
 * Used when updating a product (Vendor only)
 */
export const ProductUpdateInputSchema = z.object({
  name: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional().nullable(),
  price: z.number().positive('Price must be greater than 0').optional(),
  comparePrice: z.number().positive().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  storeId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
}).refine(
  (data) => {
    if (data.comparePrice && data.price) {
      return data.comparePrice > data.price;
    }
    return true;
  },
  {
    message: 'Compare price must be greater than price',
    path: ['comparePrice'],
  }
);

export type ProductUpdateInput = z.infer<typeof ProductUpdateInputSchema>;

/**
 * Product with Details
 * Product with related category and store information
 */
export const ProductWithDetailsSchema = ProductSchema.extend({
  category: z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
  }).optional().nullable(),
  store: z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().url().nullable(),
  }),
});

export type ProductWithDetails = z.infer<typeof ProductWithDetailsSchema>;

/**
 * Product Filters Schema
 * Used for filtering products in search/list views
 */
export const ProductFiltersSchema = z.object({
  categoryId: z.string().uuid().optional(),
  storeId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type ProductFilters = z.infer<typeof ProductFiltersSchema>;
