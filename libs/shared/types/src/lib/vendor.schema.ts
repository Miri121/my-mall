import { z } from 'zod';

/**
 * Vendor Schema
 * Represents a vendor entity in the system
 */
export const VendorSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().min(1, 'Company name is required').max(200),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone format'),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Vendor = z.infer<typeof VendorSchema>;

/**
 * Vendor Create Input Schema
 * Used when creating a new vendor (Admin only)
 */
export const VendorCreateInputSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().min(1, 'Company name is required').max(200),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100),
});

export type VendorCreateInput = z.infer<typeof VendorCreateInputSchema>;

/**
 * Vendor Update Input Schema
 * Used when updating a vendor (Admin only, except password)
 */
export const VendorUpdateInputSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  company: z.string().min(1).max(200).optional(),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone format')
    .optional(),
  isActive: z.boolean().optional(),
});

export type VendorUpdateInput = z.infer<typeof VendorUpdateInputSchema>;

/**
 * Vendor with Statistics
 * Vendor data with additional computed statistics
 */
export const VendorWithStatsSchema = VendorSchema.extend({
  storeCount: z.number().int().min(0),
  productCount: z.number().int().min(0),
  activeStoreCount: z.number().int().min(0),
});

export type VendorWithStats = z.infer<typeof VendorWithStatsSchema>;
