'use client';

import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import css from "./order.module.css";
import { useFormik } from "formik";
import UserInfoForm from "@/components/UserInfoForm/UserInfoForm";
import { CartItem, useShopStore } from "@/lib/store/cartSrore";
import { CreateOrderForm, OrderGood } from "@/types/order";

const OrderPage = () => {

    const { cartItems } = useShopStore();

    const transformCartToOrderGoods = (cartItems: CartItem[]): OrderGood[] => {
        return cartItems.map(item => ({
            goodId: item.goodId,
            amount: item.amount,
            size: item.size
        }));
    }

    const formik = useFormik<CreateOrderForm>({
        initialValues: {
            name: "",
            lastname: "",
            phone: "",
            city: "",
            branchnum_np: "",
            email: "",
            avatar: "",
            comment: "",
        },
        onSubmit: (values) => {
            const orderPayload = {
            goods: transformCartToOrderGoods(cartItems),
            userName: values.name,
            userLastName: values.lastname,
            userPhone: values.phone,
            branchnum_np: values.branchnum_np,
            comment: values.comment,
            sum: cartItems.reduce((total, item) => total + item.price * item.amount, 0)
        };
            console.log(orderPayload);
        }
    });

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
                    <form className={css.form} onSubmit={formik.handleSubmit}>
                        <UserInfoForm formik={formik} />
                        <label className={css.comment}>
                            <textarea 
                                name="comment"
                                className={css.comment_text} 
                                placeholder="Введіть ваш коментар"
                                value={formik.values.comment || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        <button type="submit" className={css.submit_button}>
                            Оформити замовлення
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;