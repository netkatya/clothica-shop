import { useTranslations } from 'next-intl';
import Link from 'next/link';
import css from '../Header/Header.module.css';

export default function Basket({ count }: { count: number }) {
  const t = useTranslations('Header');

  return (
    <div className={css.basketWrapper}>
      <Link
        href="/basket"
        aria-label={t('basket')}
        className={css.basketBtn}
        scroll={false}
      >
        <svg width="20" height="21" className={css.basketButtonSvg}>
          <use href="/symbol-defs.svg#icon-basket"></use>
        </svg>

        {count > 0 && <span className={css.badge}>{count}</span>}
      </Link>
    </div>
  );
}
