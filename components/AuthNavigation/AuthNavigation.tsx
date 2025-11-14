'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';

type AuthNavigationProps = {
  onClick?: () => void;
};

export default function AuthNavigation({ onClick }: AuthNavigationProps) {
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
              Кабінет
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
              Вхід
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/auth/register"
              className={css.authButton}
              prefetch={false}
              onClick={onClick}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
}
