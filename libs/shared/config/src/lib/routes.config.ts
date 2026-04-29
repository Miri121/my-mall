/**
 * Routes Configuration Module
 *
 * Centralized route path definitions for all three applications:
 * - Mall App (Customer-facing)
 * - Vendor App (Vendor management)
 * - Admin App (System administration)
 */

/**
 * Mall App Routes (Customer-Facing)
 *
 * Route definitions for the customer-facing mall application.
 * Customers can browse stores, search products, and manage their accounts.
 */
export const MALL_ROUTES = {
  /** Home page */
  home: '/',
  /** Customer login page */
  login: '/login',
  /** Customer registration page */
  register: '/register',
  /** Forgot password page */
  forgotPassword: '/forgot-password',
  /** Reset password page (requires token parameter) */
  resetPassword: '/reset-password/:token',

  /** Store-related routes */
  stores: {
    /** Browse all stores */
    list: '/stores',
    /** View store details (by slug) */
    detail: '/stores/:slug',
  },

  /** Product-related routes */
  products: {
    /** Browse all products */
    list: '/products',
    /** View product details */
    detail: '/products/:id',
  },

  /** Search page */
  search: '/search',

  /** Customer account routes */
  account: {
    /** Account dashboard */
    dashboard: '/account',
    /** Edit profile */
    profile: '/account/profile',
    /** Change password */
    password: '/account/password',
    /** Account preferences */
    preferences: '/account/preferences',
    /** Favorite stores/products */
    favorites: '/account/favorites',
    /** Browsing history */
    history: '/account/history',
    /** Delete account */
    delete: '/account/delete',
  },
} as const;

/**
 * Vendor App Routes
 *
 * Route definitions for the vendor management application.
 * Vendors can manage their products and stores.
 */
export const VENDOR_ROUTES = {
  /** Vendor login page */
  login: '/login',
  /** Forgot password page */
  forgotPassword: '/forgot-password',
  /** Reset password page (requires token parameter) */
  resetPassword: '/reset-password/:token',
  /** Vendor dashboard */
  dashboard: '/dashboard',

  /** Product management routes */
  products: {
    /** List all vendor products */
    list: '/products',
    /** Create new product */
    create: '/products/new',
    /** View product details */
    detail: '/products/:id',
    /** Edit product */
    edit: '/products/:id/edit',
    /** Delete product confirmation */
    delete: '/products/:id/delete',
  },

  /** Store management routes */
  stores: {
    /** List vendor stores */
    list: '/stores',
    /** View store details */
    detail: '/stores/:id',
  },

  /** Vendor account routes */
  account: {
    /** Account dashboard */
    dashboard: '/account',
    /** Edit profile */
    profile: '/account/profile',
    /** Change password */
    password: '/account/password',
    /** Account preferences */
    preferences: '/account/preferences',
  },
} as const;

/**
 * Admin App Routes
 *
 * Route definitions for the admin application.
 * Administrators can manage vendors, stores, users, and view analytics.
 */
export const ADMIN_ROUTES = {
  /** Admin login page */
  login: '/login',
  /** Forgot password page */
  forgotPassword: '/forgot-password',
  /** Reset password page (requires token parameter) */
  resetPassword: '/reset-password/:token',
  /** Admin dashboard */
  dashboard: '/dashboard',

  /** Vendor management routes */
  vendors: {
    /** List all vendors */
    list: '/vendors',
    /** Create new vendor */
    create: '/vendors/new',
    /** View vendor details */
    detail: '/vendors/:id',
    /** Edit vendor */
    edit: '/vendors/:id/edit',
    /** Delete vendor confirmation */
    delete: '/vendors/:id/delete',
  },

  /** Store management routes */
  stores: {
    /** List all stores */
    list: '/stores',
    /** Create new store */
    create: '/stores/new',
    /** View store details */
    detail: '/stores/:id',
    /** Edit store */
    edit: '/stores/:id/edit',
    /** Delete store confirmation */
    delete: '/stores/:id/delete',
  },

  /** User management routes */
  users: {
    /** List all users */
    list: '/users',
    /** View user details */
    detail: '/users/:id',
    /** Edit user */
    edit: '/users/:id/edit',
    /** Delete user confirmation */
    delete: '/users/:id/delete',
  },

  /** Product management routes */
  products: {
    /** List all products */
    list: '/products',
    /** View product details */
    detail: '/products/:id',
  },

  /** Analytics dashboard */
  analytics: '/analytics',
  /** Audit logs viewer */
  auditLogs: '/audit-logs',
} as const;

/**
 * Mall Route Builder Functions
 *
 * Helper functions to build mall app routes with parameters.
 */
export const buildMallRoute = {
  /**
   * Build store detail route
   * @param slug - Store URL slug
   * @returns Route path
   */
  storeDetail: (slug: string) => `/stores/${slug}`,

  /**
   * Build product detail route
   * @param id - Product ID
   * @returns Route path
   */
  productDetail: (id: string) => `/products/${id}`,

  /**
   * Build reset password route
   * @param token - Password reset token
   * @returns Route path
   */
  resetPassword: (token: string) => `/reset-password/${token}`,
} as const;

/**
 * Vendor Route Builder Functions
 *
 * Helper functions to build vendor app routes with parameters.
 */
export const buildVendorRoute = {
  /**
   * Build product detail route
   * @param id - Product ID
   * @returns Route path
   */
  productDetail: (id: string) => `/products/${id}`,

  /**
   * Build product edit route
   * @param id - Product ID
   * @returns Route path
   */
  productEdit: (id: string) => `/products/${id}/edit`,

  /**
   * Build store detail route
   * @param id - Store ID
   * @returns Route path
   */
  storeDetail: (id: string) => `/stores/${id}`,

  /**
   * Build reset password route
   * @param token - Password reset token
   * @returns Route path
   */
  resetPassword: (token: string) => `/reset-password/${token}`,
} as const;

/**
 * Admin Route Builder Functions
 *
 * Helper functions to build admin app routes with parameters.
 */
export const buildAdminRoute = {
  /**
   * Build vendor detail route
   * @param id - Vendor ID
   * @returns Route path
   */
  vendorDetail: (id: string) => `/vendors/${id}`,

  /**
   * Build vendor edit route
   * @param id - Vendor ID
   * @returns Route path
   */
  vendorEdit: (id: string) => `/vendors/${id}/edit`,

  /**
   * Build store detail route
   * @param id - Store ID
   * @returns Route path
   */
  storeDetail: (id: string) => `/stores/${id}`,

  /**
   * Build store edit route
   * @param id - Store ID
   * @returns Route path
   */
  storeEdit: (id: string) => `/stores/${id}/edit`,

  /**
   * Build user detail route
   * @param id - User ID
   * @returns Route path
   */
  userDetail: (id: string) => `/users/${id}`,

  /**
   * Build user edit route
   * @param id - User ID
   * @returns Route path
   */
  userEdit: (id: string) => `/users/${id}/edit`,

  /**
   * Build product detail route
   * @param id - Product ID
   * @returns Route path
   */
  productDetail: (id: string) => `/products/${id}`,

  /**
   * Build reset password route
   * @param token - Password reset token
   * @returns Route path
   */
  resetPassword: (token: string) => `/reset-password/${token}`,
} as const;
