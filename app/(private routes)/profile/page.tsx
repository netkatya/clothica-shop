'use client';

import { Order } from '@/types/order';
import { UserProfile } from '@/types/user';
import { useState, useEffect } from 'react';
import OrdersList from '@/components/OrderList/OrderList';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
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
import { ApiError } from '@/types/auth';

const emptyFormValues: Partial<UserProfile> = {
  name: '',
  phone: '',
  lastname: '',
  city: '',
  branchnum_np: '',
};

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Занадто коротка назва!')
    .max(32, 'Занадто довга назва!'),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Введіть номер у форматі +380XXXXXXXXX')
    .required('Обовʼязкове поле'),
  lastname: Yup.string()
    .min(2, 'Занадто коротке прізвище!')
    .max(128, 'Занадто довге прізвище!'),
  city: Yup.string()
    .min(2, 'Занадто коротка назва міста!')
    .max(100, 'Занадто довга назва міста!'),
  branchnum_np: Yup.string()
    .min(1, 'Занадто короткий номер відділення НП!')
    .max(10, 'Занадто довгий номер відділення НП!'),
});
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';

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
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        if (isAuthenticated) {
          setLoading(true);
          const [fetchedOrders, fetchedUser] = await Promise.all([
            fetchOrdersClient(),
            getMe(),
          ]);

          setOrders(fetchedOrders);

          setUser(fetchedUser || emptyFormValues);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [authUser, isAuthenticated]);

  const handleSubmit = async (
    values: UserProfile,
    formikHelpers: FormikHelpers<UserProfile>
  ) => {
    try {
      const updatedUser = await updateMe(values);
      if (updatedUser) {
        setAuthUser(updatedUser);
        setUser({ ...updatedUser });
      } else {
        setError('Помилка зберігання змін користувача!');
      }
    } catch (error) {
      const errorAPI = error as ApiError;
      if (errorAPI.response?.status === 400) {
        setError('Користувач з таким номером телефону вже існує');
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            'Невідома помилка!'
        );
      }
    }

    formikHelpers.resetForm();
  };

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
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
              enableReinitialize
              initialValues={{
                ...user,
              }}
              validationSchema={UserSchema}
              onSubmit={handleSubmit}
            >
              {formik => (
                <Form>
                  <UserInfoForm formik={formik} />
                  {error && <p className={css.apiErrorMessage}>{error}</p>}
                  <button type="submit" className={css.saveButton}>
                    Зберегти зміни
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <h2>Мої замовлення</h2>
            {orders.length > 0 ? (
              <OrdersList orders={orders} />
            ) : (
              <MessageNoInfo
                text="У вас ще не було жодних замовлень! Мерщій до покупок!"
                buttonText="До покупок"
                route="/goods"
              />
            )}
          </div>
        </div>

        <button onClick={handleLogout} className={css.logoutButton}>
          Вийти з кабінету
        </button>
      </div>
    </main>
  );
}
