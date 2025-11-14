import { OrderStatus } from '@/types/order';

export interface LocalizedStatus {
  [key: string]: {
    en: string;
    uk: string;
  };
}

export const ORDER_STATUS: LocalizedStatus[] = [
  { new: { en: 'new', uk: 'новий' } },
  { processing: { en: 'processing', uk: 'обробка' } },
  { picking: { en: 'picking', uk: 'підбір' } },
  { completed: { en: 'completed', uk: 'завершено' } },
  { cancelled: { en: 'cancelled', uk: 'скасовано' } },
];

export const getLocalizedStatus = (
  status: OrderStatus,
  locale: 'en' | 'uk'
) => {
  const localizedStatus = ORDER_STATUS.find(item => item[status]);
  return localizedStatus ? localizedStatus[status][locale] : status;
};
