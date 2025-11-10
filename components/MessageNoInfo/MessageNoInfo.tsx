import Link from 'next/link';
import styles from './MessageNoInfo.module.css';

export default function MessageNoInfo() {
  return (
    <div className={styles.noOrdersWrapper}>
      <p className={styles.messageText}>
        У вас ще не було жодних замовлень! Мерщій до покупок!
      </p>

      <Link href="/goods" className={styles.shopButton}>
        До покупок
      </Link>
    </div>
  );
}