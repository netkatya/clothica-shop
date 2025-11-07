import OrdersList from '@/components/OrederList/OrderList';
import UserInfoForm from '@/components/ProfilePage/UserInfoForm';
import { Form, Formik } from 'formik';
import Link from 'next/link';

//this shoul be in lib/api

// async function fetchOrders() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//     cache: 'no-store',
//     credentials: 'include',
//   });

//   if (!res.ok) return [];
//   return res.json();
// }

// async function fetchUser() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
//     cache: 'no-store',
//     credentials: 'include',
//   });

//   if (!res.ok) return null;
//   return res.json();
// }

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
        <Formik
          initialValues={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phone: user?.phone || '',
            city: user?.city || '',
            npOffice: user?.npOffice || '',
          }}
          onSubmit={async values => {
            // this code should be in lib/api

            // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/update`, {
            //   method: 'PATCH',
            //   credentials: 'include',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(values),
            // });
            alert('Зміни збережено');
          }}
        >
          {formik => (
            <Form>
              <UserInfoForm formik={formik} />
              <button type="submit">Зберегти зміни</button>
            </Form>
          )}
        </Formik>
      </section>

      <Link href="/auth/login" className="logout-btn">
        Вийти з кабінету
      </Link>
    </main>
  );
}
