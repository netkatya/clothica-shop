'use client';

import css from './GoodsOrderList.module.css';
import { useShopStore } from '@/lib/store/cartSrore';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

const GoodsOrderList = () => {
  const t = useTranslations('GoodsOrderList');

  const router = useRouter();
  const { cartItems, removeFromCart, updateAmount } = useShopStore();

  const goodPrice = cartItems.reduce(
    (total, good) => total + good.price * good.amount,
    0
  );
  const deliveryPrice = goodPrice > 0 ? 50 : 0;
  const totalPrice = goodPrice + deliveryPrice;

  const handleBackClick = () => {
    const id = setTimeout(() => {
      router.push('/goods');
      clearTimeout(id);
    }, 100);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {cartItems.length === 0 ? (
          <div className={css.goods_list}>
            <MessageNoInfo
              text={t('emptyCart')}
              buttonText={t('goToGoods')}
            onClick={handleBackClick}
            />
          </div>
        ) : (
          <div className={css.goods_list}>
            {cartItems.map(good => (
              <div key={good.goodId} className={css.good_item}>
                {good.image && (
                  <Image
                    className={css.good_image}
                    src={good.image}
                    alt={good.name}
                    width={82}
                    height={101}
                  />
                )}
                <div className={css.good_info}>
                  <div className={css.info_wrapper}>
                    <Link
                      href={`/goods/${good.goodId}`}
                      className={css.good_name}
                    >
                      {good.name}
                    </Link>
                    <ul className={css.good_numbers}>
                      <li className={css.good_number}>
                        <AiFillStar className={css.star_full} />
                        {good.rate}
                      </li>
                      <li className={css.good_number}>
                        <svg width="16" height="16" aria-hidden="true">
                          <use href="/symbol-defs.svg#icon-comment"></use>
                        </svg>
                        {good.reviewsNumber}
                      </li>
                      <li className={css.good_number}>
                        <p>{t('size')}: {good.size}</p>
                      </li>
                    </ul>
                  </div>
                  <div className={css.good_right}>
                    <p className={css.good_price}>{good.price} {t('currency')}</p>
                    <div className={css.good_right_actions}>
                      <input
                        type="number"
                        min={1}
                        value={good.amount || 1}
                        className={css.good_quantity}
                        onChange={e =>
                          updateAmount(
                            good.goodId,
                            good.size,
                            Number(e.target.value)
                          )
                        }
                      ></input>
                      {/* <p className={css.good_quantity}>{good.amount}</p> */}
                      <button
                        onClick={() => removeFromCart(good.goodId, good.size)}
                        className={css.delete_button}
                      >
                        <svg width="20" height="20" aria-hidden="true">
                          <use href="/symbol-defs.svg#icon-trash-can"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ul className={css.total_price_wrapper}>
          <li className={css.price_item}>
            <p className={css.provisional_price}>{t('subtotal')} </p>
            <p className={css.provisional_price_value}>{goodPrice} {t('currency')}</p>
          </li>
          <li className={css.price_item}>
            <p className={css.delivery_price}>{t('delivery')} </p>
            <p className={css.delivery_price_value}>
              {deliveryPrice === 0 ? '' : `${deliveryPrice} ${t('currency')}`}
            </p>
          </li>
          <li className={css.price_item}>
            <h3 className={css.total_price}>{t('total')} </h3>
            <h3 className={css.total_price_value}>{totalPrice} {t('currency')}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoodsOrderList;
