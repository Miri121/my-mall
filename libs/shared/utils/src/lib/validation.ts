/**
 * Validates if a string is a valid email format.
 *
 * @param email - Email string to validate
 * @returns True if valid email format
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid.email') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid international phone number.
 * Supports formats like: +1234567890, +1-234-567-8900, +1 (234) 567-8900
 *
 * @param phone - Phone number string to validate
 * @returns True if valid phone format
 *
 * @example
 * ```ts
 * isValidPhone('+1234567890') // true
 * isValidPhone('+1-234-567-8900') // true
 * isValidPhone('1234567890') // false (missing +)
 * ```
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  // Remove common separators for validation
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Validates if a string is a valid URL.
 *
 * @param url - URL string to validate
 * @returns True if valid URL format
 *
 * @example
 * ```ts
 * isValidUrl('https://example.com') // true
 * isValidUrl('http://localhost:3000') // true
 * isValidUrl('not a url') // false
 * ```
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid URL slug.
 * Slug must be lowercase, contain only alphanumeric characters and hyphens,
 * and not start or end with a hyphen.
 *
 * @param slug - Slug string to validate
 * @returns True if valid slug format
 *
 * @example
 * ```ts
 * isValidSlug('my-product-name') // true
 * isValidSlug('my-product-123') // true
 * isValidSlug('My-Product') // false (uppercase)
 * isValidSlug('-invalid-') // false (starts/ends with hyphen)
 * ```
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Sanitizes user input by removing potentially dangerous characters.
 * Prevents XSS by escaping HTML special characters.
 *
 * @param input - Input string to sanitize
 * @returns Sanitized string
 *
 * @example
 * ```ts
 * sanitizeInput('<script>alert("xss")</script>')
 * // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 * sanitizeInput('Hello & "World"')
 * // "Hello &amp; &quot;World&quot;"
 * ```
 */
export function sanitizeInput(input: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return input.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}
