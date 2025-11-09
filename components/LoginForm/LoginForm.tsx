'use client';

import { useRouter } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { login } from '@/lib/api/clientApi';
import { ApiError } from '@/types/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { UserLogin } from '@/types/user';

import css from './LoginForm.module.css';

const initialFormValues: UserLogin = {
  phone: '',
  password: '',
};

const UserSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Введіть номер у форматі +380XXXXXXXXX')
    .required('Обовʼязкове поле'),
  password: Yup.string()
    .min(8, 'Занадто короткий пароль!')
    .max(128, 'Занадто довгий пароль!')
    .required('Обовʼязкове поле'),
});

const LoginForm = ({ authType }: { authType: 'register' | 'login' }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: UserLogin,
    formikHelpers: FormikHelpers<UserLogin>
  ) => {
    try {
      const res = await login(values);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid phone or password');
      }
    } catch (err) {
      const errorAPI = err as ApiError;
      if (errorAPI.response?.status === 400) {
        setError('User with this phone already exists');
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            'Oops... some error'
        );
      }
    }

    formikHelpers.resetForm();
  };

  return (
    <>
      <div className={css.mainContent}>
        <div className={css.formLinks}>
          <Link
            className={clsx(
              authType === 'register' ? css.underlined : '',
              css.formLink
            )}
            href="/auth/register"
          >
            Реєстрація
          </Link>
          <Link
            className={clsx(
              authType === 'login' ? css.underlined : '',
              css.formLink
            )}
            href="/auth/login"
          >
            Вхід
          </Link>
        </div>
        <h1 className={css.formTitle}>Вхід</h1>
        <Formik
          initialValues={initialFormValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="phone">
                Номер телефону
              </label>

              <Field
                id="phone"
                type="text"
                name="phone"
                className={css.input}
                placeholder="+38 (0__) ___-__-__"
                required
              />
              <ErrorMessage
                name="phone"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor="password">
                Пароль
              </label>
              <Field
                id="password"
                type="password"
                name="password"
                className={css.input}
                placeholder="********"
                required
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            {error && <p className={css.apiErrorMessage}>{error}</p>}

            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Увійти
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
