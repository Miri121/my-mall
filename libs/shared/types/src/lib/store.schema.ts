import { z } from 'zod';

/**
 * Store Schema
 * Represents a store entity with REQUIRED url field for external store links
 */
export const StoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Store name is required').max(200),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  url: z.string().url('Valid store URL is required'), // REQUIRED external store URL
  description: z.string().max(1000).optional().nullable(),
  logo: z.string().url().optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  vendorId: z.string().uuid(),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Store = z.infer<typeof StoreSchema>;

/**
 * Store Create Input Schema
 * Used when creating a new store (Admin only)
 * IMPORTANT: url field is REQUIRED
 */
export const StoreCreateInputSchema = z.object({
  name: z.string().min(1, 'Store name is required').max(200),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  url: z.string().url('Valid store URL is required'), // REQUIRED
  description: z.string().max(1000).optional(),
  vendorId: z.string().uuid('Valid vendor ID is required'),
  isActive: z.boolean().optional().default(true),
});

export type StoreCreateInput = z.infer<typeof StoreCreateInputSchema>;

/**
 * Store Update Input Schema
 * Used when updating a store (Admin only)
 */
export const StoreUpdateInputSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
    .optional(),
  url: z.string().url('Valid store URL is required').optional(),
  description: z.string().max(1000).optional().nullable(),
  isActive: z.boolean().optional(),
});

export type StoreUpdateInput = z.infer<typeof StoreUpdateInputSchema>;

/**
 * Store with Vendor
 * Store data with associated vendor information
 */
export const StoreWithVendorSchema = StoreSchema.extend({
  vendor: z.object({
    id: z.string().uuid(),
    name: z.string(),
    company: z.string(),
  }),
});

export type StoreWithVendor = z.infer<typeof StoreWithVendorSchema>;

/**
 * Store with Statistics
 * Store data with additional computed statistics
 */
export const StoreWithStatsSchema = StoreSchema.extend({
  productCount: z.number().int().min(0),
  activeProductCount: z.number().int().min(0),
});

export type StoreWithStats = z.infer<typeof StoreWithStatsSchema>;
