'use client';

import Link from 'next/link';
import { useState } from 'react';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  // Імітація стану авторизації
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/cabinet" className={css.authButton} prefetch={false}>
              Кабінет
            </Link>
          </li>
          <li className={css.navigationItem}>
            <button className={css.authButton}>Вихід</button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/auth/login" className={css.authButton} prefetch={false}>
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
