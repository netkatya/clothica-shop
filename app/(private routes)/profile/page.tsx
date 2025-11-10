'use client';

import { Order } from '@/types/order';
import { UserProfile } from '@/types/user';
import { useState, useEffect } from 'react';
import { fetchOrders, fetchUser, updateUser } from '@/lib/api/profilePage';
import OrdersList from '@/components/OrderList/OrderList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import css from './page.module.css';
import Loading from '@/app/loading';

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedOrders, fetchedUser] = await Promise.all([
          fetchOrders(),
          fetchUser(),
        ]);

        setOrders(fetchedOrders);

        setUser(
          fetchedUser || {
            name: '',
            lastname: '',
            phone: '',
            city: '',
            npOffice: '',
          }
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleLogout = () => {
    //
    // Коли з'явиться API, тут буде async-запит
    //

    alert('Ви успішно вийшли з кабінету');

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
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                city: user.city,
                npOffice: user.npOffice,
              }}
              onSubmit={async (values: UserProfile) => {
                try {
                  await updateUser(values);
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
