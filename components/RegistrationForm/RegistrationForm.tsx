'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { register } from '@/lib/api/clientApi';
import { ApiError } from '@/types/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { UserPost } from '@/types/user';
import { TextField } from '../TextField/TextField';

import css from './RegistrationForm.module.css';

const initialFormValues: UserPost = {
  name: '',
  phone: '',
  password: '',
};

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Занадто коротка назва!')
    .max(32, 'Занадто довга назва!'),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Введіть номер у форматі +380XXXXXXXXX')
    .required('Обовʼязкове поле'),
  password: Yup.string()
    .min(8, 'Занадто короткий пароль!')
    .max(128, 'Занадто довгий пароль!')
    .required('Обовʼязкове поле'),
});

const RegistrationForm = ({ authType }: { authType: 'register' | 'login' }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: UserPost,
    formikHelpers: FormikHelpers<UserPost>
  ) => {
    try {
      const res = await register(values);
      if (res) {
        setUser(res);
        router.push('/profile');
        formikHelpers.resetForm();
      } else {
        setError('Помилка реєстрації користувача!');
      }
    } catch (err) {
      const errorAPI = err as ApiError;
      if (errorAPI.response?.status === 400) {
        setError('Користувач з таким номером телефону вже існує');
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            'Невідома помилка!'
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
        <h1 className={css.formTitle}>Реєстрація</h1>
        <Formik
          initialValues={initialFormValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="username">
                Ім&#700;я*
              </label>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="Ваше ім'я"
                required={true}
              ></TextField>
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor="phone">
                Номер телефону
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
                Пароль
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
                Зареєструватися
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegistrationForm;
