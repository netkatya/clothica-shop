'use client';
import 'swiper/css/pagination';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import css from './GoodsList.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchGoodsClient } from '@/lib/api/clientApi';

import { AiFillStar } from 'react-icons/ai';

export default function GoodsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['goods'],
    queryFn: () => fetchGoodsClient(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const goods = data?.data ?? [];
  return (
    <div className={css.sliderContainer}>
      <Swiper
        modules={[Navigation, Keyboard, A11y, Pagination]}
        navigation={{
          nextEl: `.${css.btnNext}`,
          prevEl: `.${css.btnPrev}`,
        }}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          el: `.${css.paginationContainer}`,
          type: 'bullets',
          dynamicBullets: true,
          dynamicMainBullets: 1,
        }}
        spaceBetween={32}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          768: { slidesPerView: 2, slidesPerGroup: 1 },
          1024: { slidesPerView: 4, slidesPerGroup: 1 },
        }}
        className={css.swiper}
        a11y={{ enabled: true }}
      >
        {goods.map(good => (
          <SwiperSlide key={good._id} className={css.item}>
            <div>
              <Image
                src={good.image}
                alt={good.name}
                width={335}
                height={223}
                className={css.image}
              />
              <div className={css.info}>
                <p className={css.name}>{good.name}</p>
                <p className={css.price}>
                  {good.price.value} {good.price.currency}
                </p>
              </div>
              <div className={css.reviews}>
                <div className={css.rate}>
                  <AiFillStar />
                  <p className={css.ratenumber}>5</p>
                </div>
                <div className={css.rate}>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="/symbol-defs.svg#icon-comment"></use>
                  </svg>
                  <p className={css.ratenumber}>{good.feedbacks.length}</p>
                </div>
              </div>
              <Link href={`/goods/${good._id}`}>
                <button className={css.detail}>Детальніше</button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.controls}>
        <div className={css.paginationContainer}></div>
        <div className={css.buttonControls}>
          <button type="button" className={css.btnPrev} aria-label="Prev">
            <LuArrowLeft size={24} />
          </button>
          <button type="button" className={css.btnNext} aria-label="Next">
            <LuArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
