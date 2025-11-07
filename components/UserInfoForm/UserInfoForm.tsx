'use client';

import { FormikProps } from 'formik';
import { UserProfile } from '@/types/user';

interface Props {
  formik: FormikProps<UserProfile>;
}

export default function UserInfoForm({ formik }: Props) {
  return (
    <div className="user-info">
      <input
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        name="npOffice"
        value={formik.values.npOffice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
  );
}
