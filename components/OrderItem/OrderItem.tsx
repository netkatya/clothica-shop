import { Order } from '@/types/order';

export default function OrderItem({ order }: { order: Order }) {
  return (
    <div className="order-item">
      <p>{order.date}</p>
      <p>№{order.orderNum}</p>
      <p>Сума: {order.sum} грн</p>
      <p>Статус: {order.status}</p>
    </div>
  );
}
