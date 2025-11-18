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

import { useTranslations } from 'next-intl';

// Типи для форми
interface ResetPasswordFormValues {
  confirmationCode: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const t = useTranslations('ResetPassword');
  
  // Схема валідації
  const validationSchema = Yup.object({
    confirmationCode: Yup.string()
      .required(t('requiredField'))
      .min(4, 'minCode'),
    password: Yup.string()
      .required(t('requiredField'))
      .min(6, t('minPassword')),
    confirmPassword: Yup.string()
      .required(t('requiredField'))
      .oneOf([Yup.ref('password')], t('passwordsMismatch')),
  });

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
          t('unknownError')
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
            <h1 className={css.title}>{t('successTitle')}</h1>
            <p className={css.description}>
              {t('successDescription')}
            </p>
            <Link href="/auth/login" className={css.mainButton}>
              {t('loginButton')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>{t('title')}</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <label htmlFor="confirmationCode" className={css.label}>
                  {t('confirmationCodeLabel')}
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
                  {t('passwordLabel')}
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
                  {t('confirmPasswordLabel')}
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
                {isSubmitting ? t('sending') : t('submitButton')}
              </button>
            </Form>
          )}
        </Formik>

        <div className={css.smallTextWrapper}>
          <Link href="/auth/login" className={css.smallLink}>
            {t('backToLogin')}
          </Link>
        </div>
      </div>
    </section>
  );
}
