// app/basket/page.tsx
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function BasketRedirectPage() {
  useEffect(() => {
    redirect('/order');
  }, []);
  return null;
}
