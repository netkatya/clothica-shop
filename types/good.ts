export interface Price {
  value: number;
  currency: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Gender = 'men' | 'women' | 'unisex';

export interface Good {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: Price;
  size: Size[];
  description: string;
  feedbacks: string[];
  prevDescription: string;
  gender: Gender;
  characteristics: string[];
}
