import { Order } from '@/types/order';
import styles from './OrderItem.module.css';

export default function OrderItem({ order }: { order: Order }) {
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
        <span className={styles.label}>Сума:</span>
        <span className={styles.value}>{order.sum} грн</span>
      </div>
      <div className={styles.col}>
        <span className={styles.label}>Статус:</span>
        <span className={styles.value}>{order.status}</span>
      </div>
    </div>
  );
}
