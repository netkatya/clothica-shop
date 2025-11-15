export interface Price {
  value: number;
  currency: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Gender = 'man' | 'women' | 'unisex';

export interface CategoryField {
  _id: string;
  name: string;
}

export type ColorOfGood =
  | 'білий'
  | 'чорний'
  | 'сірий'
  | 'синій'
  | 'блакитний'
  | 'зелений'
  | 'жовтий'
  | 'червоний'
  | 'коричневий'
  | 'бежевий'
  | 'рожевий'
  | 'мʼятний'
  | 'пастельні відтінки';

export interface Good {
  _id: string;
  name: string;
  category: CategoryField;
  image: string;
  price: Price;
  size: Size[];
  colors: ColorOfGood[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  gender: Gender;
  characteristics: string[];
  averageRate: number;
  feedbackCount: number;
}
