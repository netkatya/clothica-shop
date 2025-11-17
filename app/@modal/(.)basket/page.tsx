'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useShopStore } from '@/lib/store/cartSrore';
import css from './modal.module.css';

export default function BasketModal() {
  const router = useRouter();
  const { cartItems } = useShopStore();
  const [closing, setClosing] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if (!closing) return;

    if (nextRoute) {
      router.replace(nextRoute);
    } else {
      router.back();
    }
  }, [closing, nextRoute, router]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleGoToGoods = () => {
    setNextRoute('/goods');
    handleClose();
  };

  const handleGoToOrder = () => {
    setNextRoute('/order');
    handleClose();
  };

  return (
    <div
      className={`${css.backdrop} ${closing ? css.hiddenBackdrop : css.visibleBackdrop}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${css.modal} ${closing ? css.slideOut : css.slideIn}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={css.closeBtnContainer}>
          <button className={css.closeButton} onClick={handleClose}>
            ✕
          </button>
        </div>

        <h2 className={css.title}>Ваш кошик</h2>

        {cartItems.length > 0 ? (
          <>
            <GoodsOrderList />
            <div className={css.actions}>
              <button className={css.secondaryButton} onClick={handleGoToGoods}>
                Продовжити покупки
              </button>
              <button className={css.primaryButton} onClick={handleGoToOrder}>
                Оформити замовлення
              </button>
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
