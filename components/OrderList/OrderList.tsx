import { Order } from '@/types/order';
import OrderItem from '../OrderItem/OrderItem';
import css from './OrderList.module.css';

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className={css.orderlist}>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
}
