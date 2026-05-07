import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@org/auth';
import { LanguageSwitcher } from '@org/i18n';
import { useTranslation } from '@org/i18n';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@org/ui';
import { SearchBar } from '@org/search';
import {
  Menu,
  X,
  User,
  ShoppingBag,
  Heart,
  History,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';

export function MallHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, logout } = useAuth();
  const { t } = useTranslation('common');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">{t('appName', 'Mall')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {t('nav.home', 'Home')}
            </Link>
            <Link
              to="/stores"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {t('nav.stores', 'Stores')}
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {t('nav.products', 'Products')}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block md:flex-1 md:max-w-md md:mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('nav.account', 'Account')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/favorites" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>{t('nav.favorites', 'Favorites')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/history" className="flex items-center">
                      <History className="mr-2 h-4 w-4" />
                      <span>{t('nav.history', 'History')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account/preferences"
                      className="flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t('nav.preferences', 'Preferences')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.logout', 'Logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('auth.login', 'Login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t('auth.register', 'Register')}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                activeProps={{ className: 'bg-accent text-primary' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home', 'Home')}
              </Link>
              <Link
                to="/stores"
                className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                activeProps={{ className: 'bg-accent text-primary' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.stores', 'Stores')}
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                activeProps={{ className: 'bg-accent text-primary' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.products', 'Products')}
              </Link>

              {user ? (
                <>
                  <div className="border-t my-2" />
                  <Link
                    to="/account"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t('nav.account', 'Account')}
                  </Link>
                  <Link
                    to="/account/favorites"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    {t('nav.favorites', 'Favorites')}
                  </Link>
                  <Link
                    to="/account/history"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <History className="mr-2 h-4 w-4" />
                    {t('nav.history', 'History')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-left transition-colors hover:bg-accent rounded-md flex items-center w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout', 'Logout')}
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t my-2" />
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('auth.login', 'Login')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('auth.register', 'Register')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
