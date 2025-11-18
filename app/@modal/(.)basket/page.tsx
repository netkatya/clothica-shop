// app/@modal/(.)basket/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useShopStore } from '@/lib/store/cartSrore';
import css from './modal.module.css';

import { useTranslations } from 'next-intl';

export default function BasketModal() {
  const t = useTranslations('BasketModal');

  const router = useRouter();
  const { cartItems } = useShopStore();
  const [closing, setClosing] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    // setClosing(true);
    router.back();
  }, [router]);

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
    handleClose();
    const id = setTimeout(() => {
      router.push('/goods');
      clearTimeout(id);
    }, 100);
  };

  const handleGoToOrder = () => {
    handleClose();
    const id = setTimeout(() => {
      router.push('/order');
      clearTimeout(id);
    }, 100);
  };

  return (
    <div
      // className={`${css.backdrop} ${closing ? css.hiddenBackdrop : css.visibleBackdrop}`}
      className={`${css.backdrop} ${css.visibleBackdrop}`}
      onClick={handleBackdropClick}
    >
      <div
        // className={`${css.modal} ${closing ? css.slideOut : css.slideIn}`}
        className={`${css.modal} ${css.slideIn}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={css.closeBtnContainer}>
          <button className={css.closeButton} onClick={handleClose}>
            ✕
          </button>
        </div>

        <h2 className={css.title}>{t('title')}</h2>

        {cartItems.length > 0 ? (
          <>
            <GoodsOrderList />
            <div className={css.actions}>
              <button className={css.secondaryButton} onClick={handleGoToGoods}>
                {t('continueShopping')}
              </button>
              <button className={css.primaryButton} onClick={handleGoToOrder}>
                {t('goToOrder')}
              </button>
            </div>
          </>
        ) : (
          <MessageNoInfo
            text={t('emptyText')}
            buttonText={t('emptyButton')}
            onClick={handleGoToGoods}
          />
        )}
      </div>
    </div>
  );
}
