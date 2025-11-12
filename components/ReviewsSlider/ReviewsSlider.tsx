'use client';

import css from './ReviewsSlider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Stars from '../Stars/Stars';
import { useEffect, useState } from 'react';
import { fetchFeedbacksClient } from '@/lib/api/clientApi';

interface SliderReview {
  name: string;
  text: string;
  product: string;
  rating: number;
}

type ReviewsSliderProps = {
  hasProductText?: boolean;
  hasCenteredButtons?: boolean;
  goodId?: string;
};

export default function ReviewsSlider({
  hasProductText = true,
  hasCenteredButtons = false,
  goodId = '',
}: ReviewsSliderProps) {
  const [reviews, setReviews] = useState<SliderReview[]>([]);

  useEffect(() => {
    async function loadLatestFeedbacks() {
      try {
        const response = await fetchFeedbacksClient({
          page: '1',
          perPage: '9',
          good: goodId ? goodId : undefined,
        });
        const feedbacks = response.feedbacks || [];

        // const goodsResponse = await fetchGoodsClient();
        // const goodsMap: Record<string, string> = {};
        // goodsResponse.goods.forEach(good => {
        //   goodsMap[good._id] = good.name;
        // });

        const mapped: SliderReview[] = feedbacks.map(feedback => ({
          name: feedback.author || 'Анонім',
          text: feedback.comment || '',
          // product: goodsMap[feedback.goodId] || 'Невідомий продукт',
          product: feedback.good.name || 'Невідомий продукт',
          rating: feedback.rate || 0,
        }));

        setReviews(mapped);
      } catch (err) {
        console.error('Помилка при завантаженні відгуків', err);
      }
    }

    loadLatestFeedbacks();
  }, []);

  return (
    <div>
      <Swiper
        modules={[Navigation, Keyboard, A11y, Autoplay]}
        navigation={{ nextEl: `.${css.btnNext}`, prevEl: `.${css.btnPrev}` }}
        keyboard={{ enabled: true }}
        spaceBetween={34}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        className={css.swiper}
        a11y={{ enabled: true }}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index} className={css.item}>
            <div className={css.stars}>
              <Stars rating={item.rating} />
            </div>
            <p className={css.text}>{item.text}</p>
            <p className={css.name}>{item.name}</p>
            {hasProductText && <p className={css.product}>{item.product}</p>}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={hasCenteredButtons ? css.centeredControls : css.controls}>
        <button
          type="button"
          className={css.btnPrev}
          aria-label="Попередній слайд"
          disabled={reviews.length === 0}
        >
          <LuArrowLeft size={24} />
        </button>

        <button
          type="button"
          className={css.btnNext}
          aria-label="Наступний слайд"
          disabled={reviews.length === 0}
        >
          <LuArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
