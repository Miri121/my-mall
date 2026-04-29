import { format as dateFnsFormat, formatDistanceToNow } from 'date-fns';

/**
 * Formats a number as currency.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, 'EUR') // "€1,234.56"
 * ```
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    // Fallback if currency is invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Formats a date using date-fns format tokens.
 *
 * @param date - Date to format (Date object or ISO string)
 * @param formatStr - Format string (date-fns format tokens)
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date(2024, 8, 15), 'yyyy-MM-dd') // "2024-09-15"
 * formatDate('2024-09-15', 'MMMM do, yyyy') // "September 15th, 2024"
 * ```
 */
export function formatDate(date: Date | string, formatStr: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return dateFnsFormat(dateObj, formatStr);
}

/**
 * Formats a date as relative time (e.g., "2 hours ago", "in 3 days").
 *
 * @param date - Date to format (Date object or ISO string)
 * @returns Relative time string
 *
 * @example
 * ```ts
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "about 1 hour ago"
 * formatRelativeTime(new Date(Date.now() - 86400000 * 2)) // "2 days ago"
 * ```
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Formats a number with thousands separators.
 *
 * @param number - Number to format
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234.56) // "1,234.56"
 * ```
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

/**
 * Formats a value as a percentage.
 *
 * @param value - Number to format (0.255 = 25.5%)
 * @returns Formatted percentage string
 *
 * @example
 * ```ts
 * formatPercentage(0.255) // "25.5%"
 * formatPercentage(0.5) // "50%"
 * formatPercentage(1) // "100%"
 * ```
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
