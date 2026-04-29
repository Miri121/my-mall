import { useTranslation } from '../hooks/useTranslation.js';
import { useEffect } from 'react';

export function LanguageSwitcher() {
  const { language, changeLanguage, isRTL } = useTranslation();

  useEffect(() => {
    // Update HTML dir attribute for RTL
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const handleLanguageChange = (newLang: string) => {
    changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="en">English</option>
      <option value="he">עברית</option>
    </select>
  );
}
