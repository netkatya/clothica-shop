'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './paymentPage.module.css';
import { useState } from 'react';
import MotionCheck from '@/components/PaymentStatus/PaymentStatus';
import RadioCart from '@/components/RadioCart/RadioCart';
import { useShopStore } from '@/lib/store/cartSrore';

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Номер має містити 16 цифр')
    .required('Введіть номер картки'),
  expiry: Yup.string()
    .matches(/^\d{2}\/\d{2}$/, 'Формат MM/YY')
    .test('not-expired', 'Картка прострочена', value => {
      if (!value) return false;
      const [mmStr, yyStr] = value.split('/');
      const month = Number(mmStr);
      const year = Number('20' + yyStr);

      if (!month || month < 1 || month > 12) return false;

      const now = new Date();
      const expiryDate = new Date(year, month - 1, 1);
      const current = new Date(now.getFullYear(), now.getMonth(), 1);


      return expiryDate >= current;
    })
    .required('Введіть строк дії'),
  cvv: Yup.string()
    .matches(/^\d{3}$/, '3 цифри')
    .required('Введіть CVV'),
});

export default function CheckoutForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { cartItems } = useShopStore();
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);

  if (status === 'success') {
    return <MotionCheck status="success" />;
  }

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          cardNumber: '',
          expiry: '',
          cvv: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Payment submitted:', values);
          setTimeout(() => {
            setStatus('success');
          }, 1000);
        }}
      >
        {({ setFieldValue, isValid }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Оплата</h2>
            <RadioCart />
            <label className={css.label}>Номер картки</label>
            <Field
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className={css.input}
              onChange={(e: any) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
                const grouped = digits.replace(/(.{4})/g, '$1 ').trim();
                setFieldValue('cardNumber', grouped);
              }}
            />
            <ErrorMessage
              name="cardNumber"
              component="p"
              className={css.error}
            />

            <div className={css.row}>
              <div className={css.col}>
                <label className={css.label}>ММ/РР</label>
                <Field
                  name="expiry"
                  placeholder="12/25"
                  className={css.input}
                  onChange={(e: any) => {
                    const digits = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 4);
                    const formatted =
                      digits.length > 2
                        ? digits.slice(0, 2) + '/' + digits.slice(2)
                        : digits;
                    setFieldValue('expiry', formatted);
                  }}
                />
                <ErrorMessage
                  name="expiry"
                  component="p"
                  className={css.error}
                />
              </div>

              <div className={css.col}>
                <label className={css.label}>CVV</label>
                <Field
                  name="cvv"
                  placeholder="123"
                  className={css.input}
                  onChange={(e: any) => {
                    const digits = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 3);
                    setFieldValue('cvv', digits);
                  }}
                />
                <ErrorMessage name="cvv" component="p" className={css.error} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`${css.button} ${!isValid ? css.disabled : ''}`}
            >
              Оплатити {totalAmount}₴
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
