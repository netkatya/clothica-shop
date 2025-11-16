'use client';

import css from './GoodsOrderList.module.css';
import { useShopStore } from '@/lib/store/cartSrore';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import Link from 'next/link';

const GoodsOrderList = () => {
  const { cartItems, removeFromCart, updateAmount } = useShopStore();

  const goodPrice = cartItems.reduce(
    (total, good) => total + good.price * good.amount,
    0
  );
  const deliveryPrice = goodPrice > 0 ? 50 : 0;
  const totalPrice = goodPrice + deliveryPrice;

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {cartItems.length === 0 ? (
          <div className={css.goods_list}>
            <MessageNoInfo
              text="Кошик порожній!"
              buttonText="Перейти до товарів"
              route="/goods"
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
                        <AiFillStar className={css.star_full}>
                          {good.rate}
                        </AiFillStar>
                      </li>
                      <li className={css.good_number}>
                        <svg width="16" height="16" aria-hidden="true">
                          <use href="/symbol-defs.svg#icon-comment"></use>
                        </svg>
                        {good.reviewsNumber}
                      </li>
                      <li className={css.good_number}>
                        <p>Розмір: {good.size}</p>
                      </li>
                    </ul>
                  </div>
                  <div className={css.good_right}>
                    <p className={css.good_price}>{good.price} грн</p>
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
            <p className={css.provisional_price}>Проміжний підсумок </p>
            <p className={css.provisional_price_value}>{goodPrice} грн</p>
          </li>
          <li className={css.price_item}>
            <p className={css.delivery_price}>Доставка </p>
            <p className={css.delivery_price_value}>
              {deliveryPrice === 0 ? '' : `${deliveryPrice} грн`}
            </p>
          </li>
          <li className={css.price_item}>
            <h3 className={css.total_price}>Всього </h3>
            <h3 className={css.total_price_value}>{totalPrice} грн</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoodsOrderList;
