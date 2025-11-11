'use client';
import { useEffect, useRef } from 'react';
import css from './ScrollToTopBtn.module.css';

export default function ScrollToTopBtn() {
  const MIN_SCROLLS = 2; // <- кількість прокруток вниз перед показом кнопки
  const SHOW_AFTER = 200; // <- мінімальний скрол для появи кнопки
  const btnRef = useRef<HTMLButtonElement>(null);
  const docHeightRef = useRef(0);
  const tickingRef = useRef(false);
  const scrollCountRef = useRef(0);
  const lastScrollY = useRef(0);

  function calcDocHeight() {
    docHeightRef.current = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  function update() {
    const btn = btnRef.current;
    if (!btn) return;

    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const scrollable = docHeightRef.current - viewport;
    const ratio = scrollable > 0 ? scrollY / scrollable : 0;
    const percent = Math.min(100, Math.max(0, ratio * 100));

    // плавний градієнт заповнення
    btn.style.background = `conic-gradient(var(--color-deco-dark) ${percent}%, var(--color-deco-light) 0%)`;

    // показ кнопки після мінімальної кількості прокруток
    if (scrollCountRef.current >= MIN_SCROLLS && scrollY > SHOW_AFTER) {
      btn.classList.add(css.show);
      btn.setAttribute('aria-hidden', 'false');
    } else {
      btn.classList.remove(css.show);
      btn.setAttribute('aria-hidden', 'true');
    }

    tickingRef.current = false;
  }

  function onScroll() {
    const scrollY = window.scrollY;

    // лічимо тільки прокрутки вниз
    if (scrollY > lastScrollY.current) {
      scrollCountRef.current++;
    }

    lastScrollY.current = scrollY;

    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  }

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    calcDocHeight();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });

    const handleResize = () => {
      calcDocHeight();
      update();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={css.scrollToTopBtn}
      onClick={handleClick}
      aria-hidden="true"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <svg width="16" height="16" className={css.scrollUpIcon}>
        <use href="symbol-defs.svg#icon-arrow-up"></use>
      </svg>
    </button>
  );
}