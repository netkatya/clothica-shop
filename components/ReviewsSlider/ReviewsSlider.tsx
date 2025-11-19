'use client';

import css from './ReviewsSlider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Stars from '../Stars/Stars';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedbacksClient } from '@/lib/api/clientApi';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ReviewsSlider');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['feedbacks', goodId],
    queryFn: async () => {
      const response = await fetchFeedbacksClient({
        page: '1',
        perPage: '9',
        good: goodId || undefined,
      });

      const feedbacks = response.feedbacks || [];

      return feedbacks.map(feedback => ({
        name: feedback.author || t('anonymous'),
        text: feedback.comment || '',
        goodId: feedback.good._id,
        product: feedback.good.name || t('unknownProduct'),
        rating: feedback.rate || 0,
      }));
    },
  });

  if (isLoading) return <div className={css.loading}>{t('loading')}</div>;

  return (
    <div id="reviews-slider">
      <Swiper
        modules={[Navigation, Keyboard, A11y, Autoplay]}
        navigation={{ nextEl: `.${css.btnNext}`, prevEl: `.${css.btnPrev}` }}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        // spaceBetween={34}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // breakpoints={{
        //   768: { slidesPerView: 2, slidesPerGroup: 2 },
        //   1024: { slidesPerView: 3, slidesPerGroup: 3 },
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
          // Desktop з 1440px
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 34,
          },
        }}
        observer={true}
        observeParents={true}
        className={css.swiper}
        a11y={{ enabled: true }}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index} className={css.item}>
            <Link href={`/goods/${item.goodId}`}>
              <div className={css.stars}>
                <Stars rating={item.rating} />
              </div>
              <p className={css.text}>{item.text}</p>
              <p className={css.name}>{item.name}</p>
            </Link>
            {hasProductText && <p className={css.product}>{item.product}</p>}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={hasCenteredButtons ? css.centeredControls : css.controls}>
        <button
          type="button"
          className={css.btnPrev}
          aria-label={t('prevSlide')}
          disabled={reviews.length === 0}
        >
          <LuArrowLeft size={24} />
        </button>

        <button
          type="button"
          className={css.btnNext}
          aria-label={t('nextSlide')}
          disabled={reviews.length === 0}
        >
          <LuArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
