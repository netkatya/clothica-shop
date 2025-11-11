'use client';

import css from "./GoodsOrderList.module.css"
import { useShopStore } from "@/lib/store/cartSrore"
import Image from "next/image"
import { AiFillStar } from "react-icons/ai"


const GoodsOrderList = () => {

    const { cartItems, removeFromCart } = useShopStore();

    const goodPrice = cartItems.reduce((total, good) => total + good.price * good.amount, 0);
    const deliveryPrice = goodPrice > 0 ? 50 : 0;
    const totalPrice = goodPrice + deliveryPrice;

    return (
        <div className={css.container}>
            {cartItems.map((good) => (
                <div key={good.goodId} className={css.good_item}>
                    <div className={css.good_info}>
                    {good.image && <Image src={good.image} alt={good.name} width={82} height={101} />}                    
                        <div className={css.info_wrapper}>
                        <h3 className={css.good_name}>{good.name}</h3>
                            <div className={css.good_numbers}>
                                <AiFillStar className={css.star_full}>
                                    <span>{good.rate}</span>
                                </AiFillStar>
                                <svg width="13" height="12" aria-hidden="true">
                                    <use href="/symbol-defs.svg#icon-comment"></use>
                                </svg>
                                <span>{good.reviewsNumber}</span>
                            </div>
                        </div>
                    </div>
                    <div className={css.good_right}>
                        <p className={css.good_price}>{good.price} грн</p>
                        <div className={css.good_right_actions}>
                            <p className={css.good_quantity}>{good.amount}</p>
                            <button onClick={() => removeFromCart(good.goodId)}>
                                <svg width="17" height="19" aria-hidden="true">
                                    <use href="/symbol-defs.svg#icon-trash-can"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <ul className={css.total_price_wrapper}>
                <li className={css.price_item}>
                    <p className={css.provisional_price}>Проміжний підсумок </p>
                    <p className={css.provisional_price_value}>{goodPrice} грн</p>
                </li>
                <li className={css.price_item}>
                    <p className={css.delivery_price}>Доставка </p>
                    <p className={css.delivery_price_value}>{deliveryPrice === 0 ? "" : `${deliveryPrice} грн`}</p>
                </li>
                <li className={css.price_item}>
                    <h3 className={css.total_price}>Всього </h3>
                    <h3 className={css.total_price_value}>{totalPrice} грн</h3>
                </li>
            </ul>
        </div>
    )
}

export default GoodsOrderList