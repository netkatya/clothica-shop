'use client';
import css from './PopularGoods.module.css';
import Link from 'next/link';
import GoodsList from '../GoodsList/GoodsList';

const categoriesData = [
  {
    img: '/img/categiries/t-shirts.png',
    category: 'Футболки',
  },
  {
    img: '/img/categiries/hoodies.png',
    category: 'Худі та світшоти',
  },
  {
    img: '/img/categiries/trousers.png',
    category: 'Джинси та штани',
  },
  {
    img: '/img/categiries/dresses.png',
    category: 'Сукні та спідниці',
  },
  {
    img: '/img/categiries/coats.png',
    category: 'Куртки та верхній одяг',
  },
  {
    img: '/img/categiries/homewear.png',
    category: 'Домашній та спортивний одяг',
  },
  {
    img: '/img/categiries/tops.png',
    category: 'Топи та майки',
  },
];

export default function PopularGoods() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.title_button}>
          <h2 className={css.title}>Популярні категорії</h2>
          <Link href="/goods" className={css.button}>
            Всі товари
          </Link>
        </div>
        <GoodsList products={categoriesData} />
      </div>
    </section>
  );
}
