import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchResults } from '@org/search';
import { useTranslation } from '@org/i18n';
import { PageHeader, PageContainer } from '@org/ui';
import { useEffect } from 'react';

// Define search params
type SearchParams = {
  q?: string;
  type?: 'all' | 'products' | 'stores';
  category?: string;
};

function SearchPage() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const { q = '', category } = searchParams;

  // Redirect to home if no search query
  useEffect(() => {
    if (!q) {
      navigate({ to: '/' });
    }
  }, [q, navigate]);

  if (!q) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('search.results', 'Search Results')}
        description={t('search.resultsFor', `Results for "${q}"`)}
      />
      <SearchResults
        query={q}
        filters={category ? { categoryId: category } : undefined}
      />
    </PageContainer>
  );
}

export const Route = createFileRoute('/search')({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      q: (search.q as string) || '',
      type: (search.type as SearchParams['type']) || 'all',
      category: search.category as string,
    };
  },
});
