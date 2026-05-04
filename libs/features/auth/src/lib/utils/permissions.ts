import type { User, UserRole } from '@org/types';

// Permission levels
export type Permission = 'read' | 'write' | 'delete' | 'admin';

// Resource types
export type Resource =
  | 'products'
  | 'stores'
  | 'vendors'
  | 'users'
  | 'categories'
  | 'orders'
  | 'profile';

// Role-based permission matrix
const rolePermissionsMatrix: Record<
  UserRole,
  Partial<Record<Resource, Permission[]>>
> = {
  admin: {
    products: ['read', 'write', 'delete', 'admin'],
    stores: ['read', 'write', 'delete', 'admin'],
    vendors: ['read', 'write', 'delete', 'admin'],
    users: ['read', 'write', 'delete', 'admin'],
    categories: ['read', 'write', 'delete', 'admin'],
    orders: ['read', 'write', 'delete', 'admin'],
    profile: ['read', 'write'],
  },
  vendor: {
    products: ['read', 'write', 'delete'],
    stores: ['read', 'write'],
    vendors: ['read'],
    categories: ['read'],
    orders: ['read', 'write'],
    profile: ['read', 'write'],
  },
  customer: {
    products: ['read'],
    stores: ['read'],
    categories: ['read'],
    orders: ['read'],
    profile: ['read', 'write'],
  },
};

// Check if user has a specific permission for a resource
export function hasPermission(
  user: User | null | undefined,
  resource: Resource,
  permission: Permission
): boolean {
  if (!user) return false;

  const userPermissions = rolePermissionsMatrix[user.role]?.[resource];
  if (!userPermissions) return false;

  return userPermissions.includes(permission);
}

// Check if user has a specific role
export function hasRole(
  user: User | null | undefined,
  role: UserRole
): boolean {
  if (!user) return false;
  return user.role === role;
}

// Check if user has any of the specified roles
export function hasAnyRole(
  user: User | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

// Check if user can access a resource with at least read permission
export function canAccess(
  user: User | null | undefined,
  resource: Resource
): boolean {
  return hasPermission(user, resource, 'read');
}

// Check if user can modify a resource (write permission)
export function canModify(
  user: User | null | undefined,
  resource: Resource
): boolean {
  return hasPermission(user, resource, 'write');
}

// Check if user can delete a resource
export function canDelete(
  user: User | null | undefined,
  resource: Resource
): boolean {
  return hasPermission(user, resource, 'delete');
}

// Check if user has admin permission for a resource
export function isAdmin(user: User | null | undefined): boolean {
  if (!user) return false;
  return user.role === 'admin';
}

// Get all permissions for a user on a specific resource
export function getResourcePermissions(
  user: User | null | undefined,
  resource: Resource
): Permission[] {
  if (!user) return [];
  return rolePermissionsMatrix[user.role]?.[resource] || [];
}

// Get all resources a user can access
export function getAccessibleResources(
  user: User | null | undefined
): Resource[] {
  if (!user) return [];
  return Object.keys(rolePermissionsMatrix[user.role] || {}) as Resource[];
}
