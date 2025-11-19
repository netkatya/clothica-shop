import { capitalize } from '@/lib/utils';
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
  return localizedStatus ? capitalize(localizedStatus[status][locale]) : status;
};

export type LanguageKey = 'uk' | 'en';

export interface String2Lang {
  uk: string;
  en: string;
}

export const CITIES: String2Lang[] = [
  {
    uk: 'Вінниця',
    en: 'Vinnytsia',
  },
  {
    uk: 'Дніпро',
    en: 'Dnipro',
  },
  {
    uk: 'Донецьк',
    en: 'Donetsk',
  },
  {
    uk: 'Житомир',
    en: 'Zhytomyr',
  },
  {
    uk: 'Запоріжжя',
    en: 'Zaporizhzhia',
  },
  {
    uk: 'Івано-Франківськ',
    en: 'Ivano-Frankivsk',
  },
  {
    uk: 'Київ',
    en: 'Kyiv',
  },
  {
    uk: 'Кропивницький',
    en: 'Kropyvnytskyi',
  },
  {
    uk: 'Луганськ',
    en: 'Luhansk',
  },
  {
    uk: 'Луцьк',
    en: 'Lutsk',
  },
  {
    uk: 'Львів',
    en: 'Lviv',
  },
  {
    uk: 'Миколаїв',
    en: 'Mykolaiv',
  },
  {
    uk: 'Одеса',
    en: 'Odesa',
  },
  {
    uk: 'Полтава',
    en: 'Poltava',
  },
  {
    uk: 'Рівне',
    en: 'Rivne',
  },
  {
    uk: 'Суми',
    en: 'Sumy',
  },
  {
    uk: 'Тернопіль',
    en: 'Ternopil',
  },
  {
    uk: 'Ужгород',
    en: 'Uzhhorod',
  },
  {
    uk: 'Харків',
    en: 'Kharkiv',
  },
  {
    uk: 'Херсон',
    en: 'Kherson',
  },
  {
    uk: 'Хмельницький',
    en: 'Khmelnytskyi',
  },
  {
    uk: 'Черкаси',
    en: 'Cherkasy',
  },
  {
    uk: 'Чернівці',
    en: 'Chernivtsi',
  },
  {
    uk: 'Чернігів',
    en: 'Chernihiv',
  },
];
