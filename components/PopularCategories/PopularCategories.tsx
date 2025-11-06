'use client';

import css from './PopularCategories.module.css';

import Link from 'next/link';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import { useState } from 'react';
import Image from 'next/image';

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

export default function PopularCategories() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.title_button}>
          <h2 className={css.title}>Популярні категорії</h2>
          <Link href="/categories" className={css.button}>
            Всі категорії
          </Link>
        </div>

        <div className={css.sliderContainer}>
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            navigation={{
              nextEl: `.${css.btnNext}`,
              prevEl: `.${css.btnPrev}`,
            }}
            keyboard={{ enabled: true }}
            spaceBetween={34}
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              768: { slidesPerView: 2, slidesPerGroup: 1 },
              1024: { slidesPerView: 3, slidesPerGroup: 1 },
            }}
            className={css.swiper}
            a11y={{ enabled: true }}
          >
            {categoriesData.map((item, index) => (
              <SwiperSlide key={index} className={css.item}>
                <Image
                  src={item.img}
                  alt={item.category}
                  width={416}
                  height={277}
                  className={css.image}
                />
                <p className={css.name}>{item.category}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.controls}>
            <button type="button" className={css.btnPrev} aria-label="Prev">
              <LuArrowLeft size={24} />
            </button>
            <button type="button" className={css.btnNext} aria-label="Next">
              <LuArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
