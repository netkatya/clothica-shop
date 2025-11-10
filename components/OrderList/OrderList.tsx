import { Order } from '@/types/order';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import OrderItem from '../OrderItem/OrderItem';

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return <MessageNoInfo />;
  }

  return (
    <div>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
}
