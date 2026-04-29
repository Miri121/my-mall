import { z } from 'zod';

/**
 * Generic API Response Schema
 * Standard response wrapper for all API endpoints
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
};

/**
 * Pagination Metadata Schema
 */
export const PaginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

/**
 * Generic Paginated Response Schema
 * Standard response for paginated list endpoints
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime().optional(),
  });

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
  timestamp?: string;
};

/**
 * API Error Schema
 * Standard error response structure
 */
export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.any()).optional(),
  }),
  timestamp: z.string().datetime().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Validation Error Schema
 * Detailed validation error with field-specific messages
 */
export const ValidationErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.literal('VALIDATION_ERROR'),
    message: z.string(),
    fields: z.record(z.string(), z.array(z.string())), // field -> array of error messages
  }),
  timestamp: z.string().datetime().optional(),
});

export type ValidationError = z.infer<typeof ValidationErrorSchema>;

/**
 * Query Params Schema
 * Common query parameters for list endpoints
 */
export const QueryParamsSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional(),
});

export type QueryParams = z.infer<typeof QueryParamsSchema>;
