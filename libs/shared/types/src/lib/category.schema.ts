import { z } from 'zod';

/**
 * Category Schema
 * Represents a product category with optional parent-child hierarchy
 */
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().max(500).optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Category Create Input Schema
 * Used when creating a new category (Admin only)
 */
export const CategoryCreateInputSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().max(500).optional(),
  parentId: z.string().uuid().optional().nullable(),
});

export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>;

/**
 * Category Update Input Schema
 * Used when updating a category (Admin only)
 */
export const CategoryUpdateInputSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
    .optional(),
  description: z.string().max(500).optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
});

export type CategoryUpdateInput = z.infer<typeof CategoryUpdateInputSchema>;

/**
 * Category with Children
 * Category data with nested subcategories
 */
export const CategoryWithChildrenSchema: z.ZodType<any> = CategorySchema.extend({
  children: z.lazy(() => z.array(CategoryWithChildrenSchema)),
});

export type CategoryWithChildren = z.infer<typeof CategorySchema> & {
  children: CategoryWithChildren[];
};

/**
 * Category with Product Count
 * Category data with number of products
 */
export const CategoryWithCountSchema = CategorySchema.extend({
  productCount: z.number().int().min(0),
});

export type CategoryWithCount = z.infer<typeof CategoryWithCountSchema>;
