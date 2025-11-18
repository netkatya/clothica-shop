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

import { useTranslations } from 'next-intl';

const initialFormValues: UserPost = {
  name: '',
  phone: '',
  password: '',
};

const RegistrationForm = ({ authType }: { authType: 'register' | 'login' }) => {
  const t = useTranslations('RegistrationForm');

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.nameShort'))
      .max(32, t('errors.nameLong')),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, t('errors.phoneFormat'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(8, t('errors.passwordShort'))
      .max(128, t('errors.passwordLong'))
      .required(t('errors.required')),
  });

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
        setError(t('errors.registrationFailed'));
      }
    } catch (err) {
      const errorAPI = err as ApiError;
      if (errorAPI.response?.status === 400) {
        setError(t('errors.userExists'));
      } else {
        setError(
          errorAPI.response?.data?.error ??
            errorAPI.message ??
            t('errors.unknown')
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
            {t('registerLink')}
          </Link>
          <Link
            className={clsx(
              authType === 'login' ? css.underlined : '',
              css.formLink
            )}
            href="/auth/login"
          >
            {t('loginLink')}
          </Link>
        </div>
        <h1 className={css.formTitle}>{t('registerTitle')}</h1>
        <Formik
          initialValues={initialFormValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="username">
                {t('nameLabel')}
              </label>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder={t('namePlaceholder')}
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
                {t('submitRegister')}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegistrationForm;
