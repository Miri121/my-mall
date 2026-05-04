import { z } from 'zod';

/**
 * User Role Enum
 * Defines the three types of users in the system
 */
export const UserRole = z.enum(['customer', 'vendor', 'admin']);
export type UserRole = z.infer<typeof UserRole>;

/**
 * Base User Schema
 * Common fields for all user types
 */
export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required'),
  role: UserRole,
  avatar: z.url().optional().nullable(),
  preferredLanguage: z.enum(['en', 'he']).default('en'),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Customer Schema
 * Additional fields specific to customer users
 */
export const CustomerSchema = UserSchema.extend({
  role: z.literal('customer'),
});

export type Customer = z.infer<typeof CustomerSchema>;

/**
 * Vendor Schema (User Type)
 * Additional fields specific to vendor users
 */
export const VendorUserSchema = UserSchema.extend({
  role: z.literal('vendor'),
  company: z.string().min(1).max(200),
  vendorId: z.uuid(), // Links to the Vendor entity
});

export type VendorUser = z.infer<typeof VendorUserSchema>;

/**
 * Admin Schema
 * Additional fields specific to admin users
 */
export const AdminSchema = UserSchema.extend({
  role: z.literal('admin'),
  permissions: z.array(z.string()).default([]),
});

export type Admin = z.infer<typeof AdminSchema>;

/**
 * User Create Input Schema
 * Used when creating a new user
 */
export const UserCreateInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100),
  role: UserRole,
  phone: z.string().optional(),
  company: z.string().optional(),
  preferredLanguage: z.enum(['en', 'he']).optional(),
});

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

/**
 * User Update Input Schema
 * Used when updating an existing user
 */
export const UserUpdateInputSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().optional(),
  avatar: z.url().optional().nullable(),
  preferredLanguage: z.enum(['en', 'he']).optional(),
  isActive: z.boolean().optional(),
});

export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;
