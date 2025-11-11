'use client';
import { useEffect, useState } from 'react';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem(STORAGE_KEY);
    if (!val) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setAnimate(false);
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <div className={`${styles.wrapper} ${animate ? styles.show : ''}`}>
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
