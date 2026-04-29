/**
 * Shared Data Access Library
 *
 * Provides HTTP client, API services, TanStack Query configuration,
 * and React hooks for data fetching and mutations.
 */

// ============================================================================
// HTTP Client
// ============================================================================
export { httpClient } from './lib/http-client.js';

// ============================================================================
// TanStack Query Configuration
// ============================================================================
export { queryClient } from './lib/query-client.js';
export { queryKeys } from './lib/query-keys.js';

// ============================================================================
// API Services
// ============================================================================
export { authService } from './lib/services/auth.service.js';
export { vendorService } from './lib/services/vendor.service.js';
export { storeService } from './lib/services/store.service.js';
export { productService } from './lib/services/product.service.js';
export { userService } from './lib/services/user.service.js';
export { categoryService } from './lib/services/category.service.js';
export { searchService } from './lib/services/search.service.js';
export type { SearchSuggestion } from './lib/services/search.service.js';

// ============================================================================
// React Query Hooks - Authentication
// ============================================================================
export {
  useLogin,
  useLoginWithGoogle,
  useRegister,
  useLogout,
  useResetPassword,
  useUpdatePassword,
  useCurrentUser,
  useRefreshToken,
} from './lib/hooks/useAuth.js';

// ============================================================================
// React Query Hooks - Vendors
// ============================================================================
export {
  useVendors,
  useVendor,
  useVendorStats,
  useVendorStores,
  useCreateVendor,
  useUpdateVendor,
  useDeleteVendor,
} from './lib/hooks/useVendors.js';

// ============================================================================
// React Query Hooks - Stores
// ============================================================================
export {
  useStores,
  useStore,
  useStoreBySlug,
  useStoreWithStats,
  useStoreProducts,
  useCreateStore,
  useUpdateStore,
  useDeleteStore,
  useUploadStoreLogo,
  useUploadStoreCover,
} from './lib/hooks/useStores.js';

// ============================================================================
// React Query Hooks - Products
// ============================================================================
export {
  useProducts,
  useFilteredProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImages,
  useDeleteProductImage,
} from './lib/hooks/useProducts.js';

// ============================================================================
// React Query Hooks - Users
// ============================================================================
export {
  useUsers,
  useUser,
  useUserProfile,
  useCreateUser,
  useUpdateUser,
  useUpdateProfile,
  useDeleteUser,
  useDeleteAccount,
  useUploadAvatar,
} from './lib/hooks/useUsers.js';

// ============================================================================
// React Query Hooks - Categories
// ============================================================================
export {
  useCategories,
  useCategoriesWithChildren,
  useCategoriesWithCounts,
  useCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from './lib/hooks/useCategories.js';

// ============================================================================
// React Query Hooks - Search
// ============================================================================
export {
  useSearchProducts,
  useSearchStores,
  useSearchSuggestions,
} from './lib/hooks/useSearch.js';
