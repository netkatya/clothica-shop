import { Order } from '@/types/order';
import OrderItem from '../OrderItem/OrderItem';

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className={css.orderlist}>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
}
