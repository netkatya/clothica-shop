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

export interface Good {
  _id: string;
  name: string;
  category: CategoryField | string;
  image: string;
  price: Price;
  size: Size[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  gender: Gender;
  characteristics: string[];
  averageRate: number;
  feedbackCount: number;
}
