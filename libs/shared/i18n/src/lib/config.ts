import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files with type assertion for NodeNext module
import commonEn from '../locales/en/common.json' with { type: 'json' };
import authEn from '../locales/en/auth.json' with { type: 'json' };
import productsEn from '../locales/en/products.json' with { type: 'json' };
import storesEn from '../locales/en/stores.json' with { type: 'json' };
import vendorsEn from '../locales/en/vendors.json' with { type: 'json' };
import usersEn from '../locales/en/users.json' with { type: 'json' };
import errorsEn from '../locales/en/errors.json' with { type: 'json' };
import validationEn from '../locales/en/validation.json' with { type: 'json' };

import commonHe from '../locales/he/common.json' with { type: 'json' };
import authHe from '../locales/he/auth.json' with { type: 'json' };
import productsHe from '../locales/he/products.json' with { type: 'json' };
import storesHe from '../locales/he/stores.json' with { type: 'json' };
import vendorsHe from '../locales/he/vendors.json' with { type: 'json' };
import usersHe from '../locales/he/users.json' with { type: 'json' };
import errorsHe from '../locales/he/errors.json' with { type: 'json' };
import validationHe from '../locales/he/validation.json' with { type: 'json' };

const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    products: productsEn,
    stores: storesEn,
    vendors: vendorsEn,
    users: usersEn,
    errors: errorsEn,
    validation: validationEn,
  },
  he: {
    common: commonHe,
    auth: authHe,
    products: productsHe,
    stores: storesHe,
    vendors: vendorsHe,
    users: usersHe,
    errors: errorsHe,
    validation: validationHe,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: [
      'common',
      'auth',
      'products',
      'stores',
      'vendors',
      'users',
      'errors',
      'validation',
    ],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
