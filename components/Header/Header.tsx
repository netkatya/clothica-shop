'use client';
import { useState, useEffect } from 'react';
import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useShopStore } from '@/lib/store/cartSrore';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  //store
  const cartItems = useShopStore(state => state.cartItems);
  const count = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const Basket = () => (
    <div className={css.basketWrapper}>
      <Link
        href="/basket"
        aria-label="Basket"
        className={css.basketBtn}
        scroll={false}
      >
        <svg width="20" height="21" className={css.basketButtonSvg}>
          <use href="/symbol-defs.svg#icon-basket"></use>
        </svg>

        {count > 0 && <span className={css.badge}>{count}</span>}
      </Link>
    </div>
  );

  // Заборона скролу, коли меню відкрите
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    document.documentElement.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Слідкуємо за зміною розміру екрану
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  if (isMobile === null) return null;

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
            <>
            <ThemeToggle />
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

                <Basket />
              </div>

              {menuOpen && (
                <div className={css.mobileMenu}>
                  <nav aria-label="Mobile Navigation">
                    <ul className={css.navigationMobile}>
                      <li>
                        <Link
                          href="/"
                          className={css.navigationItemMobile}
                          onClick={() => setMenuOpen(false)}
                        >
                          Головна
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/goods"
                          className={css.navigationItemMobile}
                          onClick={() => setMenuOpen(false)}
                        >
                          Товари
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/categories"
                          className={css.navigationItemMobile}
                          onClick={() => setMenuOpen(false)}
                        >
                          Категорії
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className={css.mobileActions}>
                    <AuthNavigation onClick={() => setMenuOpen(false)} />
                  </div>
                </div>
              )}
            </>
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
                   <ThemeToggle />
                  <li className={css.navigationItem}>
                    <Basket />
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
