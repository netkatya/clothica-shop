"use client";

import css from "./Reviews.module.css";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";

import "swiper/css";
import "swiper/css/navigation";

const reviewsData = [
  {
    name: "Олена Коваль",
    text: "Футболки Clothica - це справжня знахідка для мене! Я в захваті від якості та дизайну.",
    product: "Базова футболка",
    rating: 5,
  },
  {
    name: "Ігор Петров",
    text: "Я завжди отримую компліменти, коли ношу їх футболки! Вони стильні і зручні.",
    product: "Худі з капюшоном",
    rating: 5,
  },
  {
    name: "Ігор Шевченко",
    text: "Дуже приємні та якісні матеріали",
    product: "Джинсові шорти",
    rating: 5,
  },
  {
    name: "Марія Бондар",
    text: "Розміри відповідають заявленим, сів ідеально!",
    product: "Лонгслів",
    rating: 5,
  },
  {
    name: "Андрій Данилюк",
    text: "Вартість повністю відповідає якості. Дуже задоволений покупкою.",
    product: "Спортивні штани",
    rating: 5,
  },
  {
    name: "Діана Мельник",
    text: "Стильно, зручно і під будь-який образ!",
    product: "Футболка оверсайз",
    rating: 5,
  },
  {
    name: "Владислав Кравець",
    text: "Купував у подарунок — вгадати з розміром було легко!",
    product: "Толстовка",
    rating: 5,
  },
  {
    name: "Катерина Гордієнко",
    text: "Після прання ні колір, ні форма не змінюються 👌",
    product: "Світшот",
    rating: 5,
  },
  {
    name: "Олексій Романюк",
    text: "Замовляв уже кілька разів — сервіс на висоті!",
    product: "Класична футболка",
    rating: 5,
  },
];

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleReviews = reviewsData.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsData.length;

  const loadMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 3);
    }
  };

  return (
    <section className={css.section}>
      <div className="container">
        <h2 className={css.title}>Останні відгуки</h2>

        <Swiper
          modules={[Navigation, Keyboard, A11y]}
          navigation={{
            nextEl: `.${css.btnNext}`,
            prevEl: `.${css.btnPrev}`,
          }}
          keyboard={{ enabled: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSlideNextTransitionEnd={loadMore}
          className={css.swiper}
          a11y={{ enabled: true }}
        >
          <ul className={css.list}>
            {visibleReviews.map((item, index) => (
              <SwiperSlide tag="li" key={index} className={css.item}>
                <div className={css.stars}>
                  {Array(item.rating)
                    .fill(0)
                    .map((_, i) => (
                      <AiFillStar key={i} className={css.star} />
                    ))}
                </div>
                <p className={css.text}>{item.text}</p>
                <p className={css.name}>{item.name}</p>
                <p className={css.product}>{item.product}</p>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>

        <div className={css.controls}>
          <button
            type="button"
            className={css.btnPrev}
            aria-label="Попередній слайд"
            disabled={visibleReviews.length === 0}
          >
            ◀
          </button>

          <button
            type="button"
            className={css.btnNext}
            aria-label="Наступний слайд"
            disabled={!hasMore}
            onClick={loadMore}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
