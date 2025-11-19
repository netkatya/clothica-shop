'use client';

import css from './PopularCategories.module.css';
import Link from 'next/link';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchCategoriesClient } from '@/lib/api/clientApi';
import { Category } from '@/types/category';

import { useTranslations } from 'next-intl';

// export const categoriesArray = [
//   {
//     img: '/img/categiries/t-shirts.png',
//     name: 'Футболки та сорочки',
//     _id: '690c9ce6a6276289c98fc006',
//   },
//   {
//     img: '/img/categiries/hoodies.png',
//     name: 'Худі та кофти',
//     _id: '690c9ce6a6276289c98fc00c',
//   },
//   {
//     img: '/img/categiries/trousers.png',
//     name: 'Штани та джинси',
//     _id: '690c9ce6a6276289c98fc007',
//   },
//   {
//     img: '/img/categiries/dresses.png',
//     name: 'Сукні та спідниці',
//     _id: '690c9ce6a6276289c98fc00a',
//   },
//   {
//     img: '/img/categiries/coats.png',
//     name: 'Верхній одяг',
//     _id: '690c9ce6a6276289c98fc008',
//   },
//   {
//     img: '/img/categiries/homewear.png',
//     name: 'Домашній та спортивний одяг',
//     _id: '690c9ce6a6276289c98fc00b',
//   },
//   {
//     img: '/img/categiries/tops.png',
//     name: 'Топи та майки',
//     _id: '690c9ce6a6276289c98fc009',
//   },
// ];

export default function PopularCategories() {
  const t = useTranslations('PopularCategoriesSection');

  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categories } = await fetchCategoriesClient(1, 7);

        setCategoriesData(categories);
      } catch {
        setCategoriesData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={css.section} id="PopularCategories">
      <div className="container">
        <div className={css.title_button}>
          <h2 className={css.title}>{t('title')}</h2>
          <Link href="/categories" className={css.button}>
            {t('buttonAll')}
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
            // spaceBetween={34}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            // breakpoints={{
            //   768: { slidesPerView: 2, slidesPerGroup: 1 },
            //   1024: { slidesPerView: 3, slidesPerGroup: 1 },
            // }}
            breakpoints={{
              // Mobile адаптивна версія з 375px
              375: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              // Tablet з 768px
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 24,
              },
              // Desktop з 1440px - ⬇️ ЗМІНЕНО: 4 слайди замість 3
              1440: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 32,
              },
            }}
            className={css.swiper}
            a11y={{ enabled: true }}
          >
            {categoriesData.map((item, index) => (
              <SwiperSlide key={index} className={css.item}>
                <Link
                  href={`/goods?category=${encodeURIComponent(item.name)}`}
                  className={css.card}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={416}
                    height={277}
                    className={css.image}
                  />
                </Link>
                <p className={css.name}>{item.name}</p>
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
