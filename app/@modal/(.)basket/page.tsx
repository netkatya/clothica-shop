'use client';

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList";
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo";
import { useShopStore } from "@/lib/store/cartSrore";
import Link from "next/link";
import css from "./BasketModal.module.css";

export default function BasketModal() {
  const router = useRouter();
  const { cartItems } = useShopStore();

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  useEffect(() => {

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // Клік по бекдропу
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleGoToGoods = () => {
    closeModal();
    setTimeout(() => {
      router.push("/goods");
    }, 200);
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.closeBtnContainer}>
          <button className={css.closeButton} onClick={closeModal}>
            ✕
          </button>
        </div>
        <h2 className={css.title}>Ваш кошик</h2>

        {cartItems.length > 0 ? (
          <>
            <GoodsOrderList />

            <div className={css.actions}>
              <Link href="/goods" className={css.secondaryButton} onClick={closeModal}>
                Продовжити покупки
              </Link>
              <Link href="/order" className={css.primaryButton} onClick={closeModal}>
                Оформити замовлення
              </Link>
            </div>
          </>
        ) : (
          <MessageNoInfo
            text="Ваш кошик порожній, мерщій до покупок!"
            buttonText="До покупок"
            onClick={handleGoToGoods}
          />
        )}
      </div>
    </div>
  );
}
