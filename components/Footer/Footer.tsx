'use client';
import Link from 'next/link';
import css from './Footer.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { createSubscriptionClient } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;
    if (!email) {
      return toast.error(t('subscribeError'));
    }
    setIsLoading(true);
    try {
      const res = await createSubscriptionClient({ email });
      toast.success(t('subscribed'));
    } catch (error) {
      toast.error(t('subscribeFail'));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <footer className={css.section}>
      <div className="container">
        <Toaster position="top-right" reverseOrder={false} />
        <div className={css.containerWrap}>
          <div className={css.linksContainer}>
            <a href="" aria-label="На головну" className={css.logo}>
              <svg width="84" height="36" aria-hidden="true">
                <use href="/symbol-defs.svg#icon-company-logo"></use>
              </svg>
            </a>
            <div className={css.navigationList}>
              <h2 className={css.menu}>{t('menu')}</h2>
              <ul className={css.navigationList}>
                <li className={css.navigation}>
                  <Link href="/">{t('home')}</Link>
                </li>
                <li className={css.navigation}>
                  <Link href="/goods">{t('goods')}</Link>
                </li>
                <li className={css.navigation}>
                  <Link href="/categories">{t('categories')}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={css.subscribeContainer}>
            <h3 className={css.subscribe}>{t('subscribe')}</h3>
            <p className={css.text}>
              {t('subscribeText')}
            </p>
            <div className={css.containerSubscribe}>
              <form onSubmit={handleSubmit} className={css.containerSubscribe}>
                <input
                  type="email"
                  name="email"
                  placeholder={t('emailPlaceholder')}
                  className={css.input}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                />
                <button
                  type="submit"
                  className={css.button}
                  disabled={isLoading}
                >
                  {isLoading ? t('sending') : t('subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={css.socials}>
          <p className={css.rights}>
            {new Date().getFullYear()} Clothica. {t('rights')}.
          </p>
          <ul className={css.socialContainer}>
            <li>
              <Link
                href="https://www.facebook.com"
                aria-label="facebook"
                target="_blank"
                className={css.socialLinks}
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-facebook"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com"
                aria-label="instagram"
                target="_blank"
                className={css.socialLinks}
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-instagram"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com"
                aria-label="x"
                target="_blank"
                className={css.socialLinks}
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-x"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com"
                aria-label="youtube"
                target="_blank"
                className={css.socialLinks}
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-youtube"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
