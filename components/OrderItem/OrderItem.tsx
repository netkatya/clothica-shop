import { getLocalizedStatus } from '@/constants/orders';
import { Order } from '@/types/order';
import styles from './OrderItem.module.css';
import { getTranslations } from 'next-intl/server';

export default async function OrderItem({ order }: { order: Order }) {
  const t = await getTranslations('OrderItem');

  return (
    <div className={styles.orderItem}>
      <div className={styles.col}>
        <span className={styles.value}>
          {new Date(order.date).toLocaleDateString('uk-UA')}
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
          {getLocalizedStatus(order.status, 'uk')}
        </span>
      </div>
    </div>
  );
}
