'use client';

import { resetPassword } from '@/lib/api/clientApi';
import { ApiError } from '@/types/auth';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@/components/TextField/TextField';

import css from './resetPassword.module.css';
import { log } from 'console';

// Типи для форми
interface ResetPasswordFormValues {
  confirmationCode: string;
  password: string;
  confirmPassword: string;
}

// Схема валідації
const validationSchema = Yup.object({
  confirmationCode: Yup.string()
    .required("Код підтвердження обов'язковий")
    .min(4, 'Код повинен містити мінімум 4 символи'),
  password: Yup.string()
    .required("Пароль обов'язковий")
    .min(6, 'Пароль повинен містити мінімум 6 символів'),
  confirmPassword: Yup.string()
    .required("Підтвердження паролю обов'язкове")
    .oneOf([Yup.ref('password')], 'Паролі не співпадають'),
});

export default function ResetPasswordPage() {
  const { phone: phoneURI } = useParams<{ phone: string }>();
  decodeURIComponent(phoneURI);
  const phone = decodeURIComponent(phoneURI);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues: ResetPasswordFormValues = {
    confirmationCode: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: ResetPasswordFormValues,
    { setSubmitting }: FormikHelpers<ResetPasswordFormValues>
  ) => {
    setError('');

    try {
      const res = await resetPassword({
        phone: phone,
        code: values.confirmationCode,
        password: values.password,
      });

      if (res) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Сталася помилка'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className={css.page}>
        <div className={css.card}>
          <div className={css.center}>
            <h1 className={css.title}>Пароль успішно змінено!</h1>
            <p className={css.description}>
              Тепер ви можете увійти до свого облікового запису з новим паролем.
              Перенаправлення на сторінку входу...
            </p>
            <Link href="/auth/login" className={css.mainButton}>
              Перейти до входу
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>Введіть новий пароль</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <label htmlFor="confirmationCode" className={css.label}>
                  Код підтвердження з Telegram
                </label>
                <TextField
                  name="confirmationCode"
                  id="confirmationCode"
                  type="text"
                  placeholder="Введіть код"
                />
                <ErrorMessage
                  name="confirmationCode"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="password" className={css.label}>
                  Новий пароль
                </label>
                <TextField
                  name="password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="confirmPassword" className={css.label}>
                  Повторіть пароль
                </label>
                <TextField
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.error}
                />
              </div>

              {error && <div className={css.errorBox}>{error}</div>}

              <button
                type="submit"
                className={css.mainButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Збереження...' : 'Скинути пароль'}
              </button>
            </Form>
          )}
        </Formik>

        <div className={css.smallTextWrapper}>
          <Link href="/auth/login" className={css.smallLink}>
            ← Повернутися до входу
          </Link>
        </div>
      </div>
    </section>
  );
}
