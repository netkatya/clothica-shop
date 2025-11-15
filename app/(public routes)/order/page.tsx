'use client';

import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import css from "./order.module.css";
import { Formik, Form } from "formik";
import UserInfoForm from "@/components/UserInfoForm/UserInfoForm";
import { CartItem, useShopStore } from "@/lib/store/cartSrore";
import { CreateOrderForm, OrderGood } from "@/types/order";
import { useAuthStore } from '@/lib/store/authStore';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Ім\'я не менше 3 символів!')
    .max(32, 'Ім\'я не більше 32 символів')
    .required("Ім'я обов'язкове"),
    lastname: Yup.string()
    .min(1, 'Прізвище не менше 1 символа!')
    .max(128, 'Прізвище не більше 32 символів')
    .required("Прізвище обов'язкове"),
    phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Введіть номер у форматі +380XXXXXXXXX')
    .required("Номер телефону обов'язковий"),
    city: Yup.string()
    .min(2, 'Місто не менше за 2 символи!')
    .max(100, 'Місто не більше 64 символи')
    .required("Місто доставки обов'язкове"),
    branchnum_np: Yup.string()
    .min(1, 'Номер відділення НП не повинно бути менше за 1 символ!')
    .max(10, 'Номер відділення НП не повинно перевищувати 10 символів')
    .required("Номер відділення НП обов'язковий"),
});

const OrderPage = () => {

    const router = useRouter();

    const { cartItems } = useShopStore();
    const { user: authUser } = useAuthStore();

    const initialValues: CreateOrderForm = {
        name: authUser?.name || "",
        lastname: authUser?.lastname || "",
        phone: authUser?.phone || "",
        city: authUser?.city || "",
        branchnum_np: authUser?.branchnum_np || "",
        email: authUser?.email || "",
        avatar: authUser?.avatar || "",
        comment: "",
    }
    const [initValues, setInitValues] = useState<CreateOrderForm>(initialValues);
    useEffect(() => {
    const authData = initialValues;
    const savedData = localStorage.getItem('order-form');
        if (savedData) {
            try {
            const parsed = JSON.parse(savedData);
            const mergedData = {} as CreateOrderForm;
            Object.keys(authData).forEach(key => {
                mergedData[key as keyof CreateOrderForm] = parsed[key] || authData[key as keyof CreateOrderForm];
            });
            setInitValues(mergedData);
            } catch {
                setInitValues(authData);
            }
            } 
        else {
    setInitValues(authData);
    }
    },[]);

    const transformCartToOrderGoods = (cartItems: CartItem[]): OrderGood[] => {
        return cartItems.map(item => ({
            goodId: item.goodId,
            amount: item.amount,
            size: item.size
        }));
    }

    const handleCreateOrder = async (values: CreateOrderForm) => {
            try {
            const orderPayload = {
            goods: transformCartToOrderGoods(cartItems),
            userName: values.name,
            userLastName: values.lastname,
            userPhone: values.phone,
            city: values.city,
            branchnum_np: values.branchnum_np,
            comment: values.comment,
            sum: cartItems.reduce((total, item) => total + item.price * item.amount, 0)
        };
            console.log(orderPayload);
            localStorage.setItem('pendingOrder', JSON.stringify(orderPayload));
            router.push("/payment");
        }
            catch (error) {
                console.error("Error creating order:", error);
        }
        }

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
                    <Formik 
                    enableReinitialize={true}
                    initialValues={initValues} 
                    validationSchema={OrderSchema} 
                    onSubmit={handleCreateOrder}>
                        {(formik) => (
                            <Form 
                            className={css.form}
                            onChange={() => {
                                setTimeout(() => {
                                localStorage.setItem('order-form', JSON.stringify(formik.values));
                                }, 300);
                            }}
                            >
                                <UserInfoForm formik={formik} />
                                <div className={css.comment_block}>
                                    <label className={css.comment}>
                                        Коментар
                                    </label>
                                        <textarea
                                            name="comment"
                                            className={css.comment_text}
                                            placeholder="Введіть ваш коментар"
                                            value={formik.values.comment || ''}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                </div>                              
                                <button type="submit" className={css.submit_button}>
                                    Оформити замовлення
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;