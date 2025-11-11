'use client';
import { useEffect, useState } from 'react';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'cookie_consent'; // accepted | declined

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      if (!val) {
        const timer = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const choose = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`${styles.wrapper} ${styles.show}`}>
      <div className={styles.text}>
        Ми використовуємо cookies, щоб покращити ваш досвід. Прийняти cookies?
      </div>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={() => choose('accepted')}>
          Прийняти
        </button>
        <button className={styles.decline} onClick={() => choose('declined')}>
          Відхилити
        </button>
      </div>
    </div>
  );
}
