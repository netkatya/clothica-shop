import { Order } from "@/types/order";

export default function OrderItem({ order }: { order: Order }) {
  return (
    <div className="order-item">
      <p>{order.date}</p>
      <p>№{order.number}</p>
      <p>Сума: {order.total} грн</p>
      <p>Статус: {order.status}</p>
    </div>
  );
}
