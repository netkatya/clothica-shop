import css from './NotFound.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Сторінку не знайдено | Clothica',
  description:
    'На жаль, сторінку не знайдено. Але не хвилюйся — у нас є безліч стильних речей, які чекають на тебе! Перейди на головну та знайди свій новий образ.',
  openGraph: {
    title: '404 — Сторінку не знайдено | Clothica',
    description:
      'Сторінку не знайдено. Завітай до нашого каталогу модного одягу та знайди те, що пасує саме тобі.',
    url: 'https://clothica.com/404',
    siteName: 'Clothica',
    images: [
      {
        url: '/public/img/metadata/clothica.jpg',
        width: 1200,
        height: 630,
        alt: 'Clothica 404 - Сторінку не знайдено',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 — Сторінку не знайдено | Clothica',
    description:
      'Мода не зникає! Просто ця сторінка не існує. Перейди на головну та відкрий нові колекції.',
    images: ['/public/img/metadata/clothica.jpg'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <div className="container">
        <div className={css.content}>
          <h1 className={css.code}>404</h1>
          <p className={css.message}>Упс! Схоже, ти заблукав, друже</p>
          <p className={css.text}>Сторінка, яку ти шукаєш - не існує</p>
          <Link href="/" className={css.button}>
            Повернутися на головну
          </Link>
        </div>
      </div>
    </div>
  );
}
