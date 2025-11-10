import { UserProfile } from '@/types/user';

export async function fetchOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) return [];
  return res.json();
}

export async function fetchUser(): Promise<UserProfile | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) return null;
  return res.json();
}

export async function updateUser(values: UserProfile) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/update`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}
