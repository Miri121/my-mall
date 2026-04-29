/**
 * Creates a new object with specified keys removed.
 *
 * @param object - Source object
 * @param keys - Array of keys to remove
 * @returns New object without specified keys
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'John', password: 'secret' };
 * omit(user, ['password']) // { id: 1, name: 'John' }
 * ```
 */
export function omit<T extends object>(
  object: T,
  keys: (keyof T)[]
): Partial<T> {
  const result = { ...object };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

/**
 * Creates a new object with only specified keys.
 *
 * @param object - Source object
 * @param keys - Array of keys to keep
 * @returns New object with only specified keys
 *
 * @example
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', role: 'admin' };
 * pick(user, ['id', 'name']) // { id: 1, name: 'John' }
 * ```
 */
export function pick<T extends object>(
  object: T,
  keys: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
}

/**
 * Checks if a value is empty.
 * Returns true for: null, undefined, empty string, empty array, empty object.
 *
 * @param value - Value to check
 * @returns True if value is empty
 *
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false
 * isEmpty('hello') // false
 * isEmpty([1, 2]) // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Creates a deep clone of an object.
 * Uses structuredClone if available, otherwise falls back to JSON serialization.
 *
 * @param object - Object to clone
 * @returns Deep cloned object
 *
 * @example
 * ```ts
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(original);
 * cloned.b.c = 3;
 * console.log(original.b.c); // 2 (original unchanged)
 * ```
 */
export function deepClone<T>(object: T): T {
  // Use structuredClone if available (modern browsers and Node 17+)
  if (typeof structuredClone !== 'undefined') {
    try {
      return structuredClone(object);
    } catch {
      // Fall through to JSON method
    }
  }

  // Fallback to JSON serialization
  // Note: This won't clone functions, undefined, or circular references
  try {
    return JSON.parse(JSON.stringify(object));
  } catch {
    // If JSON serialization fails, return the original
    return object;
  }
}
