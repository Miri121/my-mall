/**
 * Groups an array of objects by a specified key.
 *
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Object with grouped arrays
 *
 * @example
 * ```ts
 * const products = [
 *   { category: 'electronics', name: 'Phone' },
 *   { category: 'electronics', name: 'Laptop' },
 *   { category: 'clothing', name: 'Shirt' }
 * ];
 * groupBy(products, 'category')
 * // {
 * //   electronics: [{ category: 'electronics', name: 'Phone' }, ...],
 * //   clothing: [{ category: 'clothing', name: 'Shirt' }]
 * // }
 * ```
 */
export function groupBy<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Sorts an array of objects by a specified key.
 *
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param order - Sort order: 'asc' or 'desc' (default: 'asc')
 * @returns Sorted array (new array, does not mutate original)
 *
 * @example
 * ```ts
 * const products = [
 *   { name: 'Laptop', price: 999 },
 *   { name: 'Phone', price: 599 },
 *   { name: 'Tablet', price: 399 }
 * ];
 * sortBy(products, 'price') // Sorted by price ascending
 * sortBy(products, 'name', 'desc') // Sorted by name descending
 * ```
 */
export function sortBy<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;

    const comparison = aVal < bVal ? -1 : 1;
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Removes duplicate values from an array.
 * Uses Set for primitive values or JSON.stringify for objects.
 *
 * @param array - Array to deduplicate
 * @returns Array with unique values
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * unique(['a', 'b', 'a']) // ['a', 'b']
 * unique([{id: 1}, {id: 2}, {id: 1}]) // [{id: 1}, {id: 2}]
 * ```
 */
export function unique<T>(array: T[]): T[] {
  // For primitive types, use Set
  if (array.length === 0 || typeof array[0] !== 'object') {
    return Array.from(new Set(array));
  }

  // For objects, use JSON.stringify for comparison
  const seen = new Set<string>();
  return array.filter((item) => {
    const serialized = JSON.stringify(item);
    if (seen.has(serialized)) {
      return false;
    }
    seen.add(serialized);
    return true;
  });
}

/**
 * Splits an array into chunks of specified size.
 *
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunked arrays
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c'], 1) // [['a'], ['b'], ['c']]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
