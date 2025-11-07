import OrdersList from "@/components/ProfilePage/OrderList";
import UserInfoForm from "@/components/ProfilePage/UserInfoForm";
import Link from "next/link";

async function fetchOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return [];
  return res.json();
}

async function fetchUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProfilePage() {
  const orders = await fetchOrders();
  const user = await fetchUser();

  return (
    <main className="profile-page">
      <h1>Кабінет</h1>

      <section>
        <h2>Мої замовлення</h2>
        <OrdersList orders={orders} />
      </section>

      <section>
        <h2>Особиста інформація</h2>
        <UserInfoForm user={user} />
      </section>

      <Link href="/auth/login" className="logout-btn">
              Вийти з кабінету
        </Link>

    </main>
  );
}
