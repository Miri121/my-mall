import { useTranslation as useI18nextTranslation } from 'react-i18next';

export function useTranslation(namespace?: string) {
  const { t, i18n } = useI18nextTranslation(namespace);

  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    isRTL: i18n.language === 'he',
  };
}
