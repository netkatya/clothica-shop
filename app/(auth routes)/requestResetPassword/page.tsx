'use client';
import { useState } from 'react';
import { ApiError, RequestResetPassword } from '@/types/auth';
import Link from 'next/link';
import { requestResetPassword } from '@/lib/api/clientApi';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@/components/TextField/TextField';

import css from './requestReset.module.css';

import { useTranslations } from 'next-intl';

export default function RequestResetPasswordPage() {
  const t = useTranslations('RequestResetPassword');

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required(t('requiredField'))
      .matches(/^\+380\d{9}$/, t('invalidPhone')),
  });

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
        setError(t('invalidPhoneError'));
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

  return (
    <section className={css.page}>
      <div className={css.card}>
        {isSubmitted ? (
          <div className={css.center}>
            <h1 className={css.title}>{t('successTitle')}</h1>
            <p className={css.description}>
              {t('successDescription')}
            </p>
            <Link
              href={`/reset-password/${encodeURIComponent(submittedPhone)}`}
              className={css.mainButton}
            >
              {t('resetPageButton')}
            </Link>

            <div className={css.smallTextWrapper}>
              <Link href="/auth/login" className={css.smallLink}>
                {t('backToLogin')}
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
                  {t('title')}
                </h1>

                <Form className={css.form}>
                  <div className={css.fieldWrapper}>
                    <label htmlFor="phone" className={css.label}>
                      {t('phoneLabel')}
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
                      ? t('sending')
                      : t('submitButton')}
                  </button>
                </Form>

                <div className={css.smallTextWrapper}>
                  <p className={css.smallText}>
                    {t('rememberPassword')}
                    <Link href="/auth/login" className={css.linkGreen}>
                      {t('loginLink')}
                    </Link>
                  </p>
                </div>

                <div className={css.smallTextWrapper}>
                  <Link href="/" className={css.smallLink}>
                    {t('backToHome')}
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
