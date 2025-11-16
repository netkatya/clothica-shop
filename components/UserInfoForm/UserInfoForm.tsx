'use client';

import { FormikProps, ErrorMessage } from 'formik';
import styles from './UserInfoForm.module.css';

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
  return (
    <div className={styles.formWrapper}>
      <div className={styles.field}>
        <label className={styles.label}>Ім&#700;я*</label>
        <input
          name="name"
          className={styles.input}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ваше ім'я"
        />
        <ErrorMessage name="name" component="span" className={styles.error} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Прізвище*</label>
        <input
          name="lastname"
          className={styles.input}
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ваше прізвище"
        />
        <ErrorMessage
          name="lastname"
          component="span"
          className={styles.error}
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
        <ErrorMessage name="phone" component="span" className={styles.error} />
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
        <ErrorMessage name="city" component="span" className={styles.error} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Номер відділення НП*</label>
        <input
          name="branchnum_np"
          className={styles.input}
          value={formik.values.branchnum_np}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="1"
        />
        <ErrorMessage
          name="branchnum_np"
          component="span"
          className={styles.error}
        />
      </div>
    </div>
  );
}
