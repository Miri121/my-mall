import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS classes intelligently.
 * Resolves conflicts where the last class wins, supports conditional classes,
 * and properly handles Tailwind modifiers (hover:, focus:, etc.).
 *
 * This utility is critical for component libraries where you need to merge
 * default component classes with user-provided className props.
 *
 * @param inputs - Class values to merge (strings, objects, arrays, conditionals)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```ts
 * // Basic usage
 * cn('px-2 py-1', 'px-3') // "py-1 px-3" (px-3 wins)
 *
 * // Conditional classes
 * cn('px-2 py-1', { 'bg-red-500': isError, 'bg-green-500': !isError })
 *
 * // Component usage
 * function Button({ className, ...props }) {
 *   return (
 *     <button
 *       className={cn('px-4 py-2 rounded bg-blue-500', className)}
 *       {...props}
 *     />
 *   );
 * }
 *
 * // Allows overriding default styles
 * <Button className="bg-red-500 px-6" /> // bg-red-500 and px-6 win
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
