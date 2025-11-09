'use client';
import { useState, useEffect } from 'react';
import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  // Заборона скролу, коли меню відкрите
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [menuOpen]);

  // Функція для перевірки ширини вікна
  const checkScreenSize = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  };

  // Слідкуємо за зміною розміру екрану
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.querySelector(`.${css.section}`);
      if (!section) return;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={css.section}>
      <div className="container">
        <div className={css.header}>
          <Link href="/" aria-label="Home" className={css.logoLink}>
            <svg width="84" height="36" aria-hidden="true">
              <use href="/symbol-defs.svg#icon-company-logo"></use>
            </svg>
          </Link>

          {isMobile ? (
            <div className={css.mobileButtons}>
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen(!menuOpen)}
                className={css.burgerButton}
              >
                <svg width="19" height="13" className={css.buttonSvg}>
                  <use
                    href={
                      menuOpen
                        ? '/symbol-defs.svg#icon-close'
                        : '/symbol-defs.svg#icon-burger-menu'
                    }
                  ></use>
                </svg>
              </button>

              <div className={css.basketWrapper}>
                <Link
                  href="/basket"
                  aria-label="Basket"
                  className={css.basketBtn}
                >
                  <svg width="20" height="21" className={css.basketButtonSvg}>
                    <use href="/symbol-defs.svg#icon-basket"></use>
                  </svg>

                  {count > 0 && <span className={css.badge}>{count}</span>}
                </Link>
              </div>
            </div>
          ) : (
            <div className={css.navContainer}>
              <nav aria-label="Main Navigation" className={css.navigationList}>
                <ul className={css.navigation}>
                  <li className={css.navigationItem}>
                    <Link href="/" className={css.navigationLink}>
                      Головна
                    </Link>
                  </li>
                  <li className={css.navigationItem}>
                    <Link href="/goods" className={css.navigationLink}>
                      Товари
                    </Link>
                  </li>
                  <li className={css.navigationItem}>
                    <Link href="/categories" className={css.navigationLink}>
                      Категорії
                    </Link>
                  </li>
                </ul>

                <ul className={css.authNavigation}>
                  <AuthNavigation />
                  <li className={css.navigationItem}>
                    <Link
                      href="/basket"
                      aria-label="Basket"
                      className={css.basketBtn}
                    >
                      <svg
                        width="20"
                        height="21"
                        className={css.basketButtonSvg}
                      >
                        <use href="/symbol-defs.svg#icon-basket"></use>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {menuOpen && (
          <div className={css.mobileMenu}>
            <nav aria-label="Mobile Navigation">
              <ul className={css.navigationMobile}>
                <li>
                  <Link href="/" className={css.navigationItemMobile}>
                    Головна
                  </Link>
                </li>
                <li>
                  <Link href="/goods" className={css.navigationItemMobile}>
                    Товари
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className={css.navigationItemMobile}>
                    Категорії
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={css.mobileActions}>
              <AuthNavigation />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
