/**
 * PopularSearches Component
 *
 * Displays popular/trending search terms.
 */

import { TrendingUp } from 'lucide-react';
import { Badge } from '@org/ui';
import { cn } from '@org/utils';

interface PopularSearchesProps {
  searches?: string[];
  onSearch?: (query: string) => void;
  className?: string;
}

const DEFAULT_POPULAR_SEARCHES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports Equipment',
  'Books',
  'Toys',
  'Beauty Products',
  'Automotive',
];

/**
 * PopularSearches displays trending search terms
 */
export function PopularSearches({
  searches = DEFAULT_POPULAR_SEARCHES,
  onSearch,
  className,
}: PopularSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Popular Searches</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {searches.map((query) => (
          <Badge
            key={query}
            variant="outline"
            className="cursor-pointer hover:bg-accent justify-center py-2 text-center"
            onClick={() => onSearch?.(query)}
            role="button"
            aria-label={`Search for ${query}`}
          >
            {query}
          </Badge>
        ))}
      </div>
    </div>
  );
}
