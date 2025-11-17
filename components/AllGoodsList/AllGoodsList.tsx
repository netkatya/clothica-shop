'use client';
import { Good } from '@/types/good';
import css from './AllGoodsList.module.css';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteGoodButton from '../FavoriteGoogButton/FavoriteGoodButton';
// import { useAutoAnimate } from '@formkit/auto-animate/react';
interface AllGoodsListProps {
  goods: Good[];
}
export default function AllGoodsList({ goods }: AllGoodsListProps) {
  // const [listRef] = useAutoAnimate<HTMLUListElement>();
  return (
    <div className={css.sliderContainer}>
      <ul
        className={css.list}
        // ref={listRef}
      >
        {goods.map(good => (
          <li key={good._id} className={css.listItem}>
            <div className={css.card}>
              <Link href={`/goods/${good._id}`} className={css.detailLink}>
                <Image
                  src={good.image}
                  alt={good.name}
                  width={335}
                  height={223}
                  className={css.image}
                />
              </Link>
              <div className={css.info}>
                <p className={css.name}>{good.name}</p>
                <p className={css.price}>
                  {good.price.value} {good.price.currency}
                </p>
              </div>
              <div className={css.reviews}>
                <p className={css.star}>
                  <AiFillStar size={16} /> {''}
                  {good.averageRate ?? 5}
                </p>
                <Link
                  href={`/goods/${good._id}/#reviews`}
                  className={css.feedbacks}
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="/symbol-defs.svg#icon-comment"></use>
                  </svg>{' '}
                  {good.feedbackCount ?? 0}
                </Link>
                <FavoriteGoodButton id={good._id} />
              </div>
              <Link href={`/goods/${good._id}`} className={css.detailLink}>
                <button className={css.detail}>Детальніше</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
