'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useTranslations } from 'next-intl';

type AuthNavigationProps = {
  onClick?: () => void;
};

export default function AuthNavigation({ onClick }: AuthNavigationProps) {
  const t = useTranslations('AuthNavigation');

  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              className={css.authButton}
              prefetch={false}
              onClick={onClick}
            >
              {t('profile')}
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/auth/login"
              className={css.authButton}
              prefetch={false}
              onClick={onClick}
            >
              {t('login')}
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/auth/register"
              className={css.authButton}
              prefetch={false}
              onClick={onClick}
            >
              {t('register')}
            </Link>
          </li>
        </>
      )}
    </>
  );
}
