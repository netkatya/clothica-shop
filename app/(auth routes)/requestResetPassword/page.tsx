'use client';
import { useState } from 'react';
import { ApiError, RequestResetPassword } from '@/types/auth';
import Link from 'next/link';
import { requestResetPassword } from '@/lib/api/clientApi';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@/components/TextField/TextField';

import css from './requestReset.module.css';

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("Номер телефону обов'язковий")
    .matches(/^\+380\d{9}$/, 'Введіть номер у форматі +380XXXXXXXXX'),
});

export default function RequestResetPasswordPage() {
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState('');

  const initialValues: RequestResetPassword = {
    phone: '',
  };

  const handleSubmit = async (
    values: RequestResetPassword,
    { setSubmitting }: FormikHelpers<RequestResetPassword>
  ) => {
    setError('');

    try {
      const res = await requestResetPassword(values);

      if (res) {
        setIsSubmitted(true);
        setSubmittedPhone(values.phone);
        setError('');
      } else {
        setError('Невірний номер телефону');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Невідома помилка!'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={css.page}>
      <div className={css.card}>
        {isSubmitted ? (
          <div className={css.center}>
            <h1 className={css.title}>Повідомлення в Telegram надіслано!</h1>
            <p className={css.description}>
              Перевірте ваш чат Telegram та введіть нижче секретний код для
              відновлення паролю.
            </p>
            <Link
              href={`/reset-password/${encodeURIComponent(submittedPhone)}`}
              className={css.mainButton}
            >
              Перейти на сторінку зміни паролю
            </Link>

            <div className={css.smallTextWrapper}>
              <Link href="/auth/login" className={css.smallLink}>
                Повернутися до входу
              </Link>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <>
                <h1 className={css.title}>
                  Введіть номер телефону для відновлення пароля
                </h1>

                <Form className={css.form}>
                  <div className={css.fieldWrapper}>
                    <label htmlFor="phone" className={css.label}>
                      Номер телефону
                    </label>
                    <TextField
                      name="phone"
                      id="phone"
                      type="tel"
                      placeholder="+38 (0__) ___-__-__"
                    />
                    <ErrorMessage
                      name="phone"
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
                    {isSubmitting
                      ? 'Надсилання...'
                      : 'Надіслати повідомлення в Telegram'}
                  </button>
                </Form>

                <div className={css.smallTextWrapper}>
                  <p className={css.smallText}>
                    Пригадали пароль?
                    <Link href="/auth/login" className={css.linkGreen}>
                      Увійти
                    </Link>
                  </p>
                </div>

                <div className={css.smallTextWrapper}>
                  <Link href="/" className={css.smallLink}>
                    ← Повернутися на головну
                  </Link>
                </div>
              </>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}
