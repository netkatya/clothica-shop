'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clearIsAuthenticated, setLoading, setUser } = useAuthStore();

  useEffect(() => {
    const checkUser = async () => {
      // 1. Дивимось, чи є щось в localStorage
      const userInStorage = useAuthStore.getState().user;

      if (userInStorage) {
        try {
          // 2. Якщо є, питаємо сервер: "Ця сесія ще жива?"
          const freshUser = await getMe();
          // 3. Якщо так, оновлюємо дані (про всяк випадок)
          setUser(freshUser);
        } catch (error) {
          clearIsAuthenticated();
        }
      } else {
        // Якщо в localStorage нічого немає, просто закінчуємо завантаження
        setLoading(false);
      }
    };

    checkUser();
  }, [clearIsAuthenticated, setLoading, setUser]); // Виконуємо 1 раз

  return <>{children}</>;
}
