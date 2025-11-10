'use client';

import { Order } from '@/types/order';
import { UserProfile } from '@/types/user';
import { useState, useEffect } from 'react';
import OrdersList from '@/components/OrderList/OrderList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import css from './page.module.css';
import Loading from '@/app/loading';
import {
  fetchOrdersClient,
  getMe,
  logout,
  updateMe,
} from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    user: authUser,
    isAuthenticated,
    clearIsAuthenticated,
    setUser: setAuthUser,
  } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [fetchedOrders, fetchedUser] = await Promise.all([
          fetchOrdersClient(),
          getMe(),
        ]);

        setOrders(fetchedOrders);
        setUser({
          ...fetchedUser,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [authUser, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      alert('Ви успішно вийшли з кабінету');
      clearIsAuthenticated();
    } catch (error) {
      console.error('Logout failed', error);
    }

    router.push('/auth/login');
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!user) return <div>Користувача не знайдено</div>;

  return (
    <main className={css.profilePage}>
      <div className="container">
        <h1 className={css.title}>Кабінет</h1>

        <div className={css.contentWrapper}>
          <div className={css.formWraper}>
            <h2 className={css.formTitle}>Особиста інформація</h2>
            <Formik
              initialValues={{
                ...user,
              }}
              onSubmit={async (values: UserProfile) => {
                try {
                  const updatedUser = await updateMe(values);
                  setAuthUser(updatedUser);
                  setUser({ ...updatedUser });
                  alert('Зміни збережено');
                } catch (error) {
                  console.error(error);
                  alert('Помилка при збереженні');
                }
              }}
            >
              {formik => (
                <Form>
                  <UserInfoForm formik={formik} />
                  <button type="submit" className={css.saveButton}>
                    Зберегти зміни
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <h2>Мої замовлення</h2>
            <OrdersList orders={orders} />
          </div>
        </div>

        <button onClick={handleLogout} className={css.logoutButton}>
          Вийти з кабінету
        </button>
      </div>
    </main>
  );
}
