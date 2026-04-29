/**
 * API Error interface for type-safe error handling.
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
}

/**
 * Safely extracts an error message from various error types.
 * Handles Error objects, strings, objects with message property, and unknown errors.
 *
 * @param error - Error of unknown type
 * @returns Error message string
 *
 * @example
 * ```ts
 * try {
 *   throw new Error('Something went wrong');
 * } catch (error) {
 *   const message = getErrorMessage(error); // "Something went wrong"
 * }
 *
 * getErrorMessage('Simple error string') // "Simple error string"
 * getErrorMessage({ message: 'Custom error' }) // "Custom error"
 * getErrorMessage(null) // "An unknown error occurred"
 * ```
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unknown error occurred';
}

/**
 * Type guard to check if an error is an ApiError.
 *
 * @param error - Error to check
 * @returns True if error is ApiError
 *
 * @example
 * ```ts
 * try {
 *   await fetchData();
 * } catch (error) {
 *   if (isApiError(error)) {
 *     console.log(`API Error ${error.statusCode}: ${error.message}`);
 *   }
 * }
 * ```
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

/**
 * Handles API errors with user-friendly fallback messages.
 * Provides specific messages for common HTTP status codes.
 *
 * @param error - Error from API call
 * @returns User-friendly error message
 *
 * @example
 * ```ts
 * try {
 *   await api.fetchUser();
 * } catch (error) {
 *   const message = handleApiError(error);
 *   toast.error(message);
 * }
 * ```
 */
export function handleApiError(error: unknown): string {
  if (isApiError(error)) {
    const { statusCode, message } = error;

    // Provide user-friendly messages for common status codes
    switch (statusCode) {
      case 400:
        return message || 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return message || 'This operation conflicts with existing data.';
      case 422:
        return message || 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'A server error occurred. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return message || 'An error occurred while processing your request.';
    }
  }

  return getErrorMessage(error);
}
