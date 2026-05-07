import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '@org/i18n';
import { Button } from '@org/ui';
import { Link } from '@tanstack/react-router';
import { FeaturedStores } from '../components/FeaturedStores';
import { PopularProducts } from '../components/PopularProducts';

function HomePage() {
  const { t } = useTranslation('common');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title', 'Welcome to Mall')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t(
              'hero.subtitle',
              'Discover amazing stores and products all in one place'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/stores">
                {t('hero.exploreStores', 'Explore Stores')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">
                {t('hero.browseProducts', 'Browse Products')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <FeaturedStores />

      {/* Popular Products */}
      <PopularProducts />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title', 'Ready to Start Shopping?')}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t(
              'cta.subtitle',
              'Join thousands of happy customers discovering great products every day'
            )}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register">{t('cta.button', 'Create Account')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
