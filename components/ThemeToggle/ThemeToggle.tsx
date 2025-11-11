'use client';

import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';

const DARKREADER_OPTIONS = { brightness: 80, contrast: 100, sepia: 10 };

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    import('darkreader').then(DarkReader => {
      const enableDark = () => DarkReader.enable(DARKREADER_OPTIONS);
      const disableDark = () => DarkReader.disable();

      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        enableDark();
        setIsDark(true);
      } else if (stored === 'light') {
        disableDark();
        setIsDark(false);
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        prefersDark ? enableDark() : disableDark();
        setIsDark(prefersDark);
      }
    });
  }, []);

  const toggle = async () => {
    const DarkReader = await import('darkreader');
    if (!isDark) {
      DarkReader.enable(DARKREADER_OPTIONS);
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      DarkReader.disable();
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return (
    <label className={css.switch}>
      <input type="checkbox" checked={isDark} onChange={toggle} />
      <span className={css.slider}></span>
    </label>
  );
}
