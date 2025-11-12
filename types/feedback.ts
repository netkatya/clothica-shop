export interface FieldPopulate {
  _id: string;
  name: string;
}

export interface Feedback {
  author: string;
  rate: number;
  comment: string;
  good: FieldPopulate;
  category: FieldPopulate;
}

export interface FeedbackPost {
  author: string;
  rate: number;
  comment: string;
  good: string;
  category: string;
}
