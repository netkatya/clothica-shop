'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthNavigation() {
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/cabinet" className={css.authButton} prefetch={false}>
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
            >
              Вхід
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/auth/register"
              className={css.authButton}
              prefetch={false}
            >
              Реєстрація
            </Link>
          </li>
        </>
      )}
    </>
  );
}
