import { Order } from "@/types/order";
import MessageNoInfo from "./MessageNoInfo";
import OrderItem from "./OrderItem";

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return <MessageNoInfo />;
  }

  return (
    <div>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}
