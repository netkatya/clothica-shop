'use client';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import css from './Stars.module.css';

interface StarsProps {
  rating: number;
}

export default function Stars({ rating }: StarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = rating - i;

    if (diff >= 1) {
      return <AiFillStar key={i} className={css.starFull} />;
    } else if (diff > 0) {
      const widthPercent = diff * 100;
      return (
        <span key={i} className={css.starPartialWrapper}>
          <AiOutlineStar className={css.starEmpty} />
          <span
            className={css.starPartialFill}
            style={{ width: `${widthPercent}%` }}
          >
            <AiFillStar className={css.starFull} />
          </span>
        </span>
      );
    } else {
      return <AiOutlineStar key={i} className={css.starEmpty} />;
    }
  });

  return <div className={css.stars}>{stars}</div>;
}
