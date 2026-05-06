/**
 * RecentSearches Component
 *
 * Displays user's recent search queries stored in localStorage.
 */

import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Badge, Button } from '@org/ui';
import { cn } from '@org/utils';

interface RecentSearchesProps {
  onSearch?: (query: string) => void;
  maxItems?: number;
  className?: string;
}

/**
 * RecentSearches displays clickable recent search history
 */
export function RecentSearches({
  onSearch,
  maxItems = 10,
  className,
}: RecentSearchesProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = () => {
      try {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
          const parsed = JSON.parse(stored) as string[];
          setRecentSearches(parsed.slice(0, maxItems));
        }
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    };

    loadRecentSearches();
  }, [maxItems]);

  const handleRemove = (query: string) => {
    try {
      const filtered = recentSearches.filter((q) => q !== query);
      setRecentSearches(filtered);
      localStorage.setItem('recentSearches', JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to remove recent search:', error);
    }
  };

  const handleClearAll = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem('recentSearches');
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  };

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Recent Searches</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-xs h-7"
        >
          Clear all
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((query) => (
          <Badge
            key={query}
            variant="secondary"
            className="cursor-pointer hover:bg-accent group pr-1"
          >
            <button
              onClick={() => onSearch?.(query)}
              className="pr-1"
              aria-label={`Search for ${query}`}
            >
              {query}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(query);
              }}
              className="ml-1 hover:text-destructive"
              aria-label={`Remove ${query} from recent searches`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
