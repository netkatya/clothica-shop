import { Size } from './good';

export type OrderGood = {
  goodId: string;
  amount: number;
  size: Size;
};

export type OrderStatus =
  | 'new'
  | 'processing'
  | 'picking'
  | 'completed'
  | 'cancelled';

export interface CreateOrderForm {
  name: string;
  lastname: string;  
  phone: string;
  city: string;
  branchnum_np: string;
  email: string;
  avatar: string;
  comment?: string;
}

export type Order = {
  _id: string;
  goods: OrderGood[];
  orderNum: string;
  date: string;
  userId: string;
  sum: number;
  status: OrderStatus;
  userName: string;
  userLastName: string;
  userPhone: string;
  branchnum_np: string;
  comment?: string;
};
