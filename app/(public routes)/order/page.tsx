import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import css from "./order.module.css";

const OrderPage = () => {
    return (
        <div className={css.container}>
            <h1 className={css.title}>Оформити замовлення</h1>
            <div className={css.wrapper}>
                <div className={css.goods_list}>
                    <p className={css.list_title}>Товари</p>
                    <GoodsOrderList />
                </div>
                <div className={css.order_form}>
                    <p className={css.form_title}>Особиста Інформація</p>
                    {/* Форма замовлення буде тут */}
                </div>
            </div>
        </div>
    )
}

export default OrderPage;