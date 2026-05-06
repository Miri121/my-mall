/**
 * SearchBar Component
 *
 * Global search input with auto-complete suggestions, keyboard navigation,
 * and integration with search hooks.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Input, Button } from '@org/ui';
import { useSearchProducts, useSearchStores } from '@org/data-access';
import { cn } from '@org/utils';
import { SearchSuggestions } from './SearchSuggestions';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

/**
 * SearchBar provides global search with auto-complete suggestions
 */
export function SearchBar({
  placeholder = 'Search products and stores...',
  onSearch,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions with debounced query (limited results for suggestions)
  const { data: productsData, isLoading: isLoadingProducts } =
    useSearchProducts(
      debouncedQuery,
      { page: 1, limit: 5, sortOrder: 'desc' },
      debouncedQuery.length >= 2
    );

  const { data: storesData, isLoading: isLoadingStores } = useSearchStores(
    debouncedQuery,
    { page: 1, limit: 5, sortOrder: 'desc' },
    debouncedQuery.length >= 2
  );

  const products = productsData?.data || [];
  const stores = storesData?.data || [];
  const isLoading = isLoadingProducts || isLoadingStores;
  const totalResults = products.length + stores.length;

  // Debounce query input
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim().length >= 2) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save recent search to localStorage
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      const recent = JSON.parse(
        localStorage.getItem('recentSearches') || '[]'
      ) as string[];
      const filtered = recent.filter((q) => q !== searchQuery);
      const updated = [searchQuery, ...filtered].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  }, []);

  // Handle search submission
  const handleSubmit = useCallback(
    (searchQuery: string = query) => {
      const trimmed = searchQuery.trim();
      if (!trimmed) return;

      saveRecentSearch(trimmed);
      setIsOpen(false);
      setSelectedIndex(-1);

      if (onSearch) {
        onSearch(trimmed);
      } else {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, navigate, onSearch, saveRecentSearch]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'Enter') {
          handleSubmit();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex === -1) {
            handleSubmit();
          } else {
            // Navigate to selected item
            const selectedProduct = products[selectedIndex];
            const selectedStore = stores[selectedIndex - products.length];

            if (selectedProduct) {
              saveRecentSearch(query);
              navigate(`/products/${selectedProduct.id}`);
              setIsOpen(false);
            } else if (selectedStore) {
              saveRecentSearch(query);
              navigate(`/stores/${selectedStore.slug}`);
              setIsOpen(false);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [
      isOpen,
      selectedIndex,
      totalResults,
      products,
      stores,
      query,
      handleSubmit,
      saveRecentSearch,
      navigate,
    ]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleViewAll = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (debouncedQuery.length >= 2) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="pl-9 pr-10"
          autoFocus={autoFocus}
          aria-label="Search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          )}
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          className="absolute top-full mt-2 w-full bg-popover border border-border rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto"
          role="listbox"
        >
          <SearchSuggestions
            products={products}
            stores={stores}
            isLoading={isLoading}
            query={debouncedQuery}
            onProductClick={(id) => {
              saveRecentSearch(query);
              setIsOpen(false);
            }}
            onStoreClick={(slug) => {
              saveRecentSearch(query);
              setIsOpen(false);
            }}
            onViewAll={handleViewAll}
          />
        </div>
      )}
    </div>
  );
}
