/**
 * Truncates text to a maximum length and adds ellipsis.
 *
 * @param text - Text to truncate
 * @param length - Maximum length (default: 100)
 * @returns Truncated text with ellipsis if needed
 *
 * @example
 * ```ts
 * truncate('This is a very long text', 10) // "This is a..."
 * truncate('Short', 10) // "Short"
 * ```
 */
export function truncate(text: string, length = 100): string {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length).trim() + '...';
}

/**
 * Converts text to a URL-safe slug.
 * Converts to lowercase, replaces spaces with hyphens, removes special characters.
 *
 * @param text - Text to convert to slug
 * @returns URL-safe slug
 *
 * @example
 * ```ts
 * slugify('My Product Name!') // "my-product-name"
 * slugify('Hello World 123') // "hello-world-123"
 * slugify('  Trim   Spaces  ') // "trim-spaces"
 * ```
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param text - Text to capitalize
 * @returns Text with first letter capitalized
 *
 * @example
 * ```ts
 * capitalize('hello world') // "Hello world"
 * capitalize('HELLO') // "HELLO"
 * ```
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Returns the appropriate singular or plural form based on count.
 *
 * @param count - Number to determine singular/plural
 * @param singular - Singular form of the word
 * @param plural - Plural form of the word
 * @returns Appropriate word form
 *
 * @example
 * ```ts
 * pluralize(1, 'item', 'items') // "item"
 * pluralize(5, 'item', 'items') // "items"
 * pluralize(0, 'item', 'items') // "items"
 * ```
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return count === 1 ? singular : plural;
}

/**
 * Strips HTML tags from a string.
 *
 * @param html - HTML string to strip
 * @returns Plain text without HTML tags
 *
 * @example
 * ```ts
 * stripHtml('<p>Hello <strong>World</strong></p>') // "Hello World"
 * stripHtml('<div>Text</div>') // "Text"
 * ```
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
