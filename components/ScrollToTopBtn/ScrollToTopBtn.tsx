'use client';
import { useEffect, useState } from 'react';
import css from './ScrollToTopBtn.module.css';

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 100);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={`${css.scrollToTopBtn} ${visible ? css.show : ''}`}
    >
      <svg width="16" height="16" className={css.scrollUpIcon}>
        <use href="symbol-defs.svg#icon-arrow-up"></use>
      </svg>
    </button>
  );
}
