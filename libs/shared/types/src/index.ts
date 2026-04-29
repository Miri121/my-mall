/**
 * @packageDocumentation
 * Shared Types Library
 * 
 * This library provides all TypeScript types and Zod schemas used across the e-commerce platform.
 * All schemas include runtime validation with Zod and provide static TypeScript types via z.infer.
 */

// ============================================================================
// User Schemas & Types
// ============================================================================
export {
  UserRole,
  UserSchema,
  CustomerSchema,
  VendorUserSchema,
  AdminSchema,
  UserCreateInputSchema,
  UserUpdateInputSchema,
  type User,
  type Customer,
  type VendorUser,
  type Admin,
  type UserCreateInput,
  type UserUpdateInput,
} from './lib/user.schema.js';

// ============================================================================
// Vendor Schemas & Types
// ============================================================================
export {
  VendorSchema,
  VendorCreateInputSchema,
  VendorUpdateInputSchema,
  VendorWithStatsSchema,
  type Vendor,
  type VendorCreateInput,
  type VendorUpdateInput,
  type VendorWithStats,
} from './lib/vendor.schema.js';

// ============================================================================
// Store Schemas & Types
// ============================================================================
export {
  StoreSchema,
  StoreCreateInputSchema,
  StoreUpdateInputSchema,
  StoreWithVendorSchema,
  StoreWithStatsSchema,
  type Store,
  type StoreCreateInput,
  type StoreUpdateInput,
  type StoreWithVendor,
  type StoreWithStats,
} from './lib/store.schema.js';

// ============================================================================
// Product Schemas & Types
// ============================================================================
export {
  ProductSchema,
  ProductCreateInputSchema,
  ProductUpdateInputSchema,
  ProductWithDetailsSchema,
  ProductFiltersSchema,
  type Product,
  type ProductCreateInput,
  type ProductUpdateInput,
  type ProductWithDetails,
  type ProductFilters,
} from './lib/product.schema.js';

// ============================================================================
// Category Schemas & Types
// ============================================================================
export {
  CategorySchema,
  CategoryCreateInputSchema,
  CategoryUpdateInputSchema,
  CategoryWithChildrenSchema,
  CategoryWithCountSchema,
  type Category,
  type CategoryCreateInput,
  type CategoryUpdateInput,
  type CategoryWithChildren,
  type CategoryWithCount,
} from './lib/category.schema.js';

// ============================================================================
// API Response Schemas & Types
// ============================================================================
export {
  ApiResponseSchema,
  PaginationMetaSchema,
  PaginatedResponseSchema,
  ApiErrorSchema,
  ValidationErrorSchema,
  QueryParamsSchema,
  type ApiResponse,
  type PaginationMeta,
  type PaginatedResponse,
  type ApiError,
  type ValidationError,
  type QueryParams,
} from './lib/api-response.schema.js';

// ============================================================================
// Form Schemas & Types
// ============================================================================
export {
  LoginFormDataSchema,
  RegisterFormDataSchema,
  ForgotPasswordFormDataSchema,
  ResetPasswordFormDataSchema,
  ChangePasswordFormDataSchema,
  ProfileUpdateFormDataSchema,
  VendorProfileUpdateFormDataSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
  type ProfileUpdateFormData,
  type VendorProfileUpdateFormData,
} from './lib/forms.schema.js';
