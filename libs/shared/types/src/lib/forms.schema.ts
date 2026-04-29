import { z } from 'zod';

/**
 * Login Form Data Schema
 * Used for user/vendor/admin login
 */
export const LoginFormDataSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof LoginFormDataSchema>;

/**
 * Register Form Data Schema
 * Used for customer registration
 */
export const RegisterFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  phone: z.string().optional(),
  preferredLanguage: z.enum(['en', 'he']).optional().default('en'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof RegisterFormDataSchema>;

/**
 * Forgot Password Form Data Schema
 * Used to request password reset
 */
export const ForgotPasswordFormDataSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormDataSchema>;

/**
 * Reset Password Form Data Schema
 * Used to set new password after reset request
 */
export const ResetPasswordFormDataSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormDataSchema>;

/**
 * Change Password Form Data Schema
 * Used when user wants to change their password
 */
export const ChangePasswordFormDataSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['newPassword'],
});

export type ChangePasswordFormData = z.infer<typeof ChangePasswordFormDataSchema>;

/**
 * Profile Update Form Data Schema
 * Used for updating user profile
 */
export const ProfileUpdateFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().optional(),
  avatar: z.string().url().optional().nullable(),
  preferredLanguage: z.enum(['en', 'he']).optional(),
});

export type ProfileUpdateFormData = z.infer<typeof ProfileUpdateFormDataSchema>;

/**
 * Vendor Profile Update Form Data Schema
 * Used for updating vendor profile (Admin only, or password by vendor)
 */
export const VendorProfileUpdateFormDataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().min(1, 'Company name is required').max(200),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone format'),
});

export type VendorProfileUpdateFormData = z.infer<typeof VendorProfileUpdateFormDataSchema>;
