'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './PaymentStatus.module.css';

import { useTranslations } from 'next-intl';

type Status = 'loading' | 'success' | 'failed';

interface MotionCheckProps {
  status: Status;
  orderNumber?: string;
}

export default function MotionCheck({ status, orderNumber }: MotionCheckProps) {
  const t = useTranslations('PaymentStatus');

  if (status !== 'success') return null;

  return (
    <div className="container">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Галочка */}
        <div className={styles.checkWrapper}>
          <div className={styles.circle}>
            <svg viewBox="0 0 24 24" className={styles.check}>
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
            <div className={styles.glow}></div>
          </div>
        </div>

        {/* Текст */}
        <div className={styles.textWrapper}>
          <h2 className={styles.successText}>
            {t('successMessage', { orderNumber: orderNumber ?? '—' })}
          </h2>
          <p className={styles.subText}>{t('thankYou')}</p>
        </div>

        {/* Кнопки */}
        <div className={styles.buttonWrapper}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={styles.btn}
            onClick={() => (window.location.href = '/')}
          >
            {t('toHome')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={styles.btn}
            onClick={() => (window.location.href = '/profile')}
          >
            {t('toProfile')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
