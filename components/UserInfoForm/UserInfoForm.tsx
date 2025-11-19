'use client';

import { FormikProps, ErrorMessage } from 'formik';
import styles from './UserInfoForm.module.css';

import { useTranslations } from 'next-intl';

interface Props<T> {
  formik: FormikProps<T>;
}

export default function UserInfoForm<
  T extends {
    name: string;
    lastname: string;
    phone: string;
    city: string;
    branchnum_np: string;
  },
>({ formik }: Props<T>) {
  const t = useTranslations('UserInfoForm');

  return (
    <div className={styles.formWrapper}>
      <div className={styles.field}>
        <label className={styles.label}>{t('nameLabel')}</label>
        <input
          name="name"
          className={styles.input}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('namePlaceholder')}
        />
        <ErrorMessage name="name" component="span" className={styles.error} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('lastnameLabel')}</label>
        <input
          name="lastname"
          className={styles.input}
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('lastnamePlaceholder')}
        />
        <ErrorMessage
          name="lastname"
          component="span"
          className={styles.error}
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidthField}`}>
        <label className={styles.label}>{t('phoneLabel')}</label>
        <input
          name="phone"
          className={styles.input}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="+38 (0__) ___-__-__"
        />
        <ErrorMessage name="phone" component="span" className={styles.error} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('cityLabel')}</label>
        <input
          name="city"
          className={styles.input}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('cityPlaceholder')}
        />
        <ErrorMessage name="city" component="span" className={styles.error} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('branchLabel')}</label>
        <div className="selectWrapper">
          {' '}
          <select
            name="branchnum_np"
            className={styles.input}
            value={formik.values.branchnum_np}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <ErrorMessage
          name="branchnum_np"
          component="span"
          className={styles.error}
        />
      </div>
    </div>
  );
}
