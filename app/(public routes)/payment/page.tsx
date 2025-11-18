'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './paymentPage.module.css';
import { useEffect, useState } from 'react';
import MotionCheck from '@/components/PaymentStatus/PaymentStatus';
import RadioCart from '@/components/RadioCart/RadioCart';
import { useShopStore } from '@/lib/store/cartSrore';
import { createOrderClient } from '@/lib/api/clientApi';

import { useTranslations } from 'next-intl';

export default function CheckoutForm() {
  const t = useTranslations('CheckoutPage');

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, t('cardNumberInvalid'))
      .required(t('cardNumberRequired')),
    expiry: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, t('expiryInvalid'))
      .test('not-expired', t('expiryExpired'), value => {
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
      .required(t('expiryRequired')),
    cvv: Yup.string()
      .matches(/^\d{3}$/, t('cvvInvalid'))
      .required(t('cvvRequired')),
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const { cartItems, clearCart } = useShopStore();
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [status]);

  if (status === 'success') {
    return (
      <MotionCheck status="success" orderNumber={orderNumber || undefined} />
    );
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
        onSubmit={async values => {
          try {
            const pendingOrder = localStorage.getItem('pendingOrder');

            const parsedOrder = pendingOrder ? JSON.parse(pendingOrder) : null;
            localStorage.removeItem('order-form');

            if (parsedOrder) {
              const response = await createOrderClient(parsedOrder);

              setOrderNumber(response.orderNum);
              localStorage.removeItem('pendingOrder');
              clearCart();
              setTimeout(() => {
                setStatus('success');
              }, 1000);
            }
          } catch (error) {
            console.error('Payment error:', error);
            setStatus('error');
          }
        }}
      >
        {({ setFieldValue, isValid }) => (
          <Form className={css.form}>
            <h2 className={css.title}>{t('paymentTitle')}</h2>
            <RadioCart />
            <label className={css.label}>{t('cardNumberLabel')}</label>
            <Field
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className={css.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                <label className={css.label}>{t('expiryLabel')}</label>
                <Field
                  name="expiry"
                  placeholder="12/25"
                  className={css.input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              {t('payButton', { total: totalAmount })}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
