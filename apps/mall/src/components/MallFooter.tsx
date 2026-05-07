import { Link } from '@tanstack/react-router';
import { useTranslation } from '@org/i18n';
import { Separator } from '@org/ui';
import { Mail } from 'lucide-react';

export function MallFooter() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.about', 'About Mall')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                'footer.aboutText',
                'Your one-stop destination for discovering amazing stores and products.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.quickLinks', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/stores"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.stores', 'Stores')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.products', 'Products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.search', 'Search')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.account', 'Account')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('auth.login', 'Login')}
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('auth.register', 'Register')}
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.myAccount', 'My Account')}
                </Link>
              </li>
              <li>
                <Link
                  to="/account/favorites"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.favorites', 'Favorites')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.connect', 'Connect With Us')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                aria-label="Facebook"
              >
                <span role="img" aria-label="Facebook icon">
                  📘
                </span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                aria-label="Twitter"
              >
                <span role="img" aria-label="Twitter icon">
                  🐦
                </span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-xl"
                aria-label="Instagram"
              >
                <span role="img" aria-label="Instagram icon">
                  📷
                </span>
              </a>
              <a
                href="mailto:info@mall.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            {t(
              'footer.copyright',
              `© ${currentYear} Mall. All rights reserved.`
            )}
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.privacy', 'Privacy Policy')}
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.terms', 'Terms of Service')}
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.contact', 'Contact Us')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
