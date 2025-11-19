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

import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import ConnectTelegram from '@/components/ConnectTelegram/ConnectTelegram';

import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('ProfilePage');

  const UserSchema = Yup.object().shape({
    name: Yup.string().min(3, t('minName')).max(32, t('maxName')),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, t('invalidPhone'))
      .required(t('requiredField')),
    lastname: Yup.string().min(2, t('minLastname')).max(128, t('maxLastname')),
    city: Yup.string().min(2, t('minCity')).max(100, t('maxCity')),
    branchnum_np: Yup.string()
      .min(1, t('minBranchNum'))
      .max(10, t('maxBranchNum')),
  });

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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/auth/login');
    }

    if (!loading && isAuthenticated && !user) {
      router.replace('/auth/login');
    }
  }, [loading, isAuthenticated, user, router]);

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
        setError(t('saveError'));
      }
    } catch (error) {
      const errorAPI = error as ApiError;
      if (errorAPI.response?.status === 400) {
        setError(t('phoneExistsError'));
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            t('unknownError')
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
  if (!isAuthenticated || !user) return null;

  return (
    <main className={css.profilePage}>
      <div className="container">
        <h1 className={css.title}>{t('pageTitle')}</h1>

        <div className={css.contentWrapper}>
          <div className={css.formWraper}>
            <h2 className={css.formTitle}>{t('personalInfoTitle')}</h2>
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
                  <div className={css.telegramWrapper}>
                    <ConnectTelegram />
                  </div>
                  <button type="submit" className={css.saveButton}>
                    {t('saveChangesButton')}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div>
            <h2>{t('ordersTitle')}</h2>
            {orders.length > 0 ? (
              <OrdersList orders={orders} />
            ) : (
              <MessageNoInfo
                text="У вас ще не було жодних замовлень! Мерщій до покупок!"
                buttonText="До покупок"
                onClick={() => router.push('/goods')}
              />
            )}
          </div>
        </div>

        <button onClick={handleLogout} className={css.logoutButton}>
          {t('logoutButton')}
        </button>
      </div>
    </main>
  );
}
