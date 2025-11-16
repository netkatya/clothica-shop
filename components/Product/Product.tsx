'use client';

import { useState } from 'react';
import css from './Product.module.css';
import Image from 'next/image';
import Stars from '@/components/Stars/Stars';
import { Good, Size } from '@/types/good';
import { useShopStore } from '@/lib/store/cartSrore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductProps {
  good: Good;
}

export default function Product({ good }: ProductProps) {
  const [value, setValue] = useState<number>(1);
  //size
  const [selectedSize, setSelectedSize] = useState<Size>(good.size[0]);
  // store
  const addToCart = useShopStore(state => state.addToCart);

  const router = useRouter();

  const handleAddToCart = () => {
    if (!good) return;
    addToCart({
      goodId: good._id,
      name: good.name,
      rate: good.averageRate,
      reviewsNumber: good.feedbackCount,
      price: good.price.value,
      amount: value,
      size: selectedSize,
      image: good.image,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();

    router.push('/order');
  };

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.content}>
          <Image
            src={good.image}
            alt={good.name}
            width={335}
            height={337}
            className={css.image}
            priority
          />
          <div className={css.column}>
            <div className={css.productDescription}>
              <p className={css.breadcrumbs}>
                Всі товари &nbsp;&gt;&nbsp; <span>{good.name}</span>
              </p>
              <h1 className={css.title}>{good.name}</h1>
              <div className={css.details}>
                <p className={css.price}>
                  {good.price.value} {good.price.currency}
                </p>
                <div className={css.verticalLine} />
                <div className={css.reviews}>
                  {good.feedbackCount > 0 ? (
                    <>
                      <Stars rating={good.averageRate} />
                      <Link href={`/goods/${good._id}#reviews`}>
                        <span className={css.ratingText}>
                          ({good.averageRate}) • {good.feedbackCount} відгуків
                        </span>
                      </Link>
                    </>
                  ) : (
                    'Немає відгуків'
                  )}
                </div>
              </div>

              <p className={css.text}>{good.prevDescription}</p>
              <div className={css.sizeSelect}>
                <label className={css.label}>Розмір :</label>
                <select
                  className={css.size}
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value as Size)}
                >
                  {good.size.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className={css.inputContainer}>
                <button className={css.addToBucket} onClick={handleAddToCart}>
                  Додати в кошик
                </button>
                <input
                  type="number"
                  min={1}
                  value={value || ''}
                  className={css.quantityInput}
                  onChange={e => setValue(Number(e.target.value))}
                ></input>
              </div>
            </div>
            <button className={css.buyNow} onClick={handleBuyNow}>
              Купити зараз
            </button>
            <p className={css.freeDelivery}>
              Безкоштовна доставка для замовлень від 1000 грн
            </p>
            <div>
              <h2 className={css.descTitle}>Опис</h2>
              <p className={css.descText}>{good.description}</p>
              <p className={css.descSubtitle}>Основні характеристики</p>
              <ul className={css.listDisc}>
                {good.characteristics.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
