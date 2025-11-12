export interface GoodPopulate {
  _id: string;
  name: string;
}

export interface Feedback {
  author: string;
  rate: number;
  comment: string;
  good: GoodPopulate;
  category: string;
}
