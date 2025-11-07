'use client';
import 'swiper/css/pagination';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import css from './GoodsList.module.css';

interface GoodsListInt {
  products: {
    img: string;
    category: string;
  }[];
}

export default function GoodsList({ products }: GoodsListInt) {
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
        {products.map((item, index) => (
          <SwiperSlide key={index} className={css.item}>
            <div>
              <Image
                src={item.img}
                alt={item.category}
                width={335}
                height={223}
                className={css.image}
              />
              <div className={css.info}>
                <p className={css.name}>Базова футболка Clothica</p>
                <p className={css.price}>1499 грн</p>
              </div>
              <div>
                <p>star 5</p>
              </div>
              <Link href="/goods">
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
