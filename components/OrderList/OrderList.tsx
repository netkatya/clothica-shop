import { Order } from '@/types/order';
import OrderItem from '../OrderItem/OrderItem';

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
}
