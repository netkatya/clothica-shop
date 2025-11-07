'use client';

import css from './Reviews.module.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Stars from '../Stars/Stars';

const reviewsData = [
  {
    name: 'Олена Коваль',
    text: '"Футболки Clothica - це справжня знахідка для мене! Я в захваті від якості та дизайну."',
    product: 'Базова футболка',
    rating: 4.5,
  },
  {
    name: 'Ігор Петров',
    text: '"Я завжди отримую компліменти, коли ношу їх футболки! Вони стильні і зручні."',
    product: 'Худі з капюшоном',
    rating: 5,
  },
  {
    name: 'Ігор Шевченко',
    text: '"Матеріали якісні, футболка тримає форму і виглядає чудово після прання."',
    product: 'Джинсові шорти',
    rating: 5,
  },
  {
    name: 'Марія Бондар',
    text: '"Розмір підійшов ідеально, носиться комфортно і не втрачає форму."',
    product: 'Лонгслів',
    rating: 5,
  },
  {
    name: 'Андрій Данилюк',
    text: '"Вартість повністю відповідає якості, тканина приємна та міцна."',
    product: 'Спортивні штани',
    rating: 5,
  },
  {
    name: 'Діана Мельник',
    text: '"Стильно, зручно і під будь-який образ, тканина дихає і не мнеться."',
    product: 'Футболка оверсайз',
    rating: 5,
  },
  {
    name: 'Владислав Кравець',
    text: '"Купував у подарунок, підійшло чудово і тканина приємна на дотик."',
    product: 'Толстовка',
    rating: 5,
  },
  {
    name: 'Катерина Гордієнко',
    text: '"Після прання колір та форма не змінюються, якість на висоті."',
    product: 'Світшот',
    rating: 5,
  },
  {
    name: 'Олексій Романюк',
    text: '"Замовляв кілька разів, сервіс чудовий і доставка швидка."',
    product: 'Класична футболка',
    rating: 5,
  },
  {
    name: 'Анна Савченко',
    text: '"Матеріал приємний, шви акуратні, дизайн виглядає стильно і дорого."',
    product: 'Футболка з принтом',
    rating: 5,
  },
  {
    name: 'Максим Коваленко',
    text: '"Худі комфортне, тканина м’яка і дихає, носити зручно цілий день."',
    product: 'Худі на блискавці',
    rating: 5,
  },
  {
    name: 'Ірина Петренко',
    text: '"Лонгслів якісний, колір залишається яскравим, тканина міцна."',
    product: 'Лонгслів базовий',
    rating: 5,
  },
];

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleReviews = reviewsData.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsData.length;

  const loadMore = () => {
    if (hasMore) {
      setVisibleCount(prev => prev + 3);
    }
  };

  return (
    <section className={css.section}>
      <div className="container">
        <div>
          <h2 className={css.title}>Останні відгуки</h2>
        </div>
        <Swiper
          modules={[Navigation, Keyboard, A11y, Autoplay]}
          navigation={{
            nextEl: `.${css.btnNext}`,
            prevEl: `.${css.btnPrev}`,
          }}
          keyboard={{ enabled: true }}
          spaceBetween={34}
          slidesPerView={1}
          slidesPerGroup={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          className={css.swiper}
          a11y={{ enabled: true }}
        >
          {visibleReviews.map((item, index) => (
            <SwiperSlide key={index} className={css.item}>
              <div className={css.stars}>
                <Stars rating={item.rating} />
              </div>
              <p className={css.text}>{item.text}</p>

              <p className={css.name}>{item.name}</p>
              <p className={css.product}>{item.product}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.controls}>
          <button
            type="button"
            className={css.btnPrev}
            aria-label="Попередній слайд"
            disabled={visibleReviews.length === 0}
          >
            <LuArrowLeft size={24} />
          </button>

          <button
            type="button"
            className={css.btnNext}
            aria-label="Наступний слайд"
            disabled={!hasMore}
            onClick={loadMore}
          >
            <LuArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
