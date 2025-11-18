'use client';

import { useRouter } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { login } from '@/lib/api/clientApi';
import { ApiError } from '@/types/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { UserLogin } from '@/types/user';
import { TextField } from '../TextField/TextField';

import css from './LoginForm.module.css';

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('LoginForm');

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
        formikHelpers.resetForm();
      } else {
        setError(t('registrationError'));
      }
    } catch (err) {
      const errorAPI = err as ApiError;
      if (errorAPI.response?.status === 401) {
        setError(t('invalidCredentials'));
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            t('unknownError')
        );
      }
      setTimeout(() => setError(''), 5000);
    }
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
            {t('register')}
          </Link>
          <Link
            className={clsx(
              authType === 'login' ? css.underlined : '',
              css.formLink
            )}
            href="/auth/login"
          >
            {t('login')}
          </Link>
        </div>
        <h1 className={css.formTitle}>{t('title')}</h1>
        <Formik
          initialValues={initialFormValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="phone">
                {t('phoneLabel')}
              </label>

              <TextField
                name="phone"
                id="phone"
                type="text"
                placeholder="+38 (0__) ___-__-__"
                required={true}
              ></TextField>
              <ErrorMessage
                name="phone"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor="password">
                {t('passwordLabel')}
              </label>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="********"
                required={true}
              ></TextField>
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            {error && (
              <p className={error ? css.errorMessage : css.successMessage}>
                {error}
              </p>
            )}

            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                {t('submitButton')}
              </button>
            </div>
          </Form>
        </Formik>
        <div className={css.resetWrapper}>
          <p className={css.resetText}>
            {t('forgotPassword')}
            <Link href="/requestResetPassword" className={css.resetLink}>
              {t('resetLink')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
