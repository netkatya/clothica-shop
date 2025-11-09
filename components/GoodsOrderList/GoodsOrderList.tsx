import css from "./GoodsOrderList.module.css"
import { useShopStore } from "@/lib/store/cartSrore"
import Image from "next/image"
import { AiFillStar } from "react-icons/ai"


const GoodsOrderList = () => {

    const { cartItems, removeFromCart } = useShopStore();

    const goodPrice = cartItems.reduce((total, good) => total + good.price * good.quantity, 0);
    const deliveryPrice = goodPrice > 0 ? 50 : 0;
    const totalPrice = goodPrice + deliveryPrice;

    return (
        <div className={css.container}>
            {cartItems.map((good) => (
                <div key={good.goodId} className={css.good_item}>
                    {good.image && <Image src={good.image} alt={good.name} width={82} height={101} />}
                    <h3 className={css.good_name}>{good.name}</h3>
                    <AiFillStar className={css.star_full}>
                        <span>{good.rate}</span>
                    </AiFillStar>
                    <svg width="13" height="12" aria-hidden="true">
                        <use href="/symbol-defs.svg#icon-comment"></use>
                    </svg>
                    <span>{good.reviewsNumber}</span>
                    <p className={css.good_price}>{good.price} грн</p>
                    <p className={css.good_quantity}>{good.quantity}</p>
                    <button onClick={() => removeFromCart(good.goodId)}>
                        <svg width="17" height="19" aria-hidden="true">
                            <use href="/symbol-defs.svg#icon-trash-can"></use>
                        </svg>
                    </button>
                </div>
            ))}
            <div className={css.total_price}>
                <p>Проміжний підсумок: {goodPrice} грн</p>
                <p>Доставка: {deliveryPrice === 0 ? "" : `${deliveryPrice} грн`}</p>
                <h3>Всього: {totalPrice} грн</h3>
            </div>
        </div>
    )
}

export default GoodsOrderList