'use client';

import { getLocalizedStatus } from '@/constants/orders';
import { Order } from '@/types/order';
import styles from './OrderItem.module.css';
import { useLocale, useTranslations } from 'next-intl';

export default function OrderItem({ order }: { order: Order }) {
  const t = useTranslations('OrderItem');
  const locale = useLocale();

  return (
    <div className={styles.orderItem}>
      <div className={styles.col}>
        <span className={styles.value}>
          {new Date(order.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'uk-UA')}
        </span>
        <span className={`${styles.value} ${styles.orderNumber}`}>
          №{order.orderNum}
        </span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>{t('sum')}</span>
        <span className={styles.value}>{order.sum} {t('uah') }</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>{t('status')}</span>
        <span className={styles.value}>
          {getLocalizedStatus(order.status, locale as 'uk' | 'en')}
        </span>
      </div>
    </div>
  );
}
