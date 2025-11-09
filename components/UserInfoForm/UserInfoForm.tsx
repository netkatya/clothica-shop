'use client';

import { FormikProps } from 'formik';
import { UserProfile } from '@/types/user';
import styles from './UserInfoForm.module.css';

interface Props {
  formik: FormikProps<UserProfile>;
}

export default function UserInfoForm({ formik }: Props) {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.field}>
        <label className={styles.label}>Ім’я*</label>
        <input
          name="firstName"
          className={styles.input}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ваше ім'я"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Прізвище*</label>
        <input
          name="lastName"
          className={styles.input}
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ваше прізвище"
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidthField}`}>
        <label className={styles.label}>Номер телефону*</label>
        <input
          name="phone"
          className={styles.input}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="+38 (0__) ___-__-__"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Місто доставки*</label>
        <input
          name="city"
          className={styles.input}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ваше місто"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Номер відділення НП*</label>
        <input
          name="npOffice"
          className={styles.input}
          value={formik.values.branchnum_np}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="1"
        />
      </div>
    </div>
  );
}
