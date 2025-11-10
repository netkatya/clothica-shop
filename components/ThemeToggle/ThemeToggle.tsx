'use client';

import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');

    import('darkreader').then(DarkReader => {
      const enableDark = () =>
        DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });

      const disableDark = () => DarkReader.disable();

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
      DarkReader.enable({ brightness: 80, contrast: 90, sepia: 10 });
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
