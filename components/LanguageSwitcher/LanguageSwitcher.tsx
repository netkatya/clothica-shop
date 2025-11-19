'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './LanguageSwitcher.module.css';

export default function LanguageToggleButton() {
  const router = useRouter();
  const [locale, setLocale] = useState('uk');

  useEffect(() => {
    const stored = localStorage.getItem('locale') || 'uk';
    setLocale(stored);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'uk' ? 'en' : 'uk';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.cookie = `locale=${newLocale}; path=/;`;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('localeChange'));
    }

    router.refresh();
  };

  return (
    <button
      className={css.langButton}
      onClick={toggleLocale}
      aria-label="Switch language"
    >
      {locale === 'uk' ? 'UA' : 'EN'}
    </button>
  );
}
