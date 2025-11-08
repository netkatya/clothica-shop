'use client';

import { Order } from '@/types/order';
import { UserProfile } from '@/types/user';
import { useState, useEffect } from 'react';
import { fetchOrders, fetchUser, updateUser } from '@/lib/api/profilePage';
import OrdersList from '@/components/OrderList/OrderList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import styles from './page.module.css'; 

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
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
            npOffice: "",
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
  
  if (loading) return <div>Завантаження...</div>;
  if (!user) return <div>Користувача не знайдено</div>;

  return (
    <main className={styles.profilePage}>
      <h1>Кабінет</h1>

      <div className={styles.contentWrapper}>
        <section>
          <h2>Мої замовлення</h2>
          <OrdersList orders={orders} />
        </section>

        <section>
          <h2>Особиста інформація</h2>
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
              </Form>
            )}
          </Formik>
        </section>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        Вийти з кабінету
      </button>
    </main>
  );
}