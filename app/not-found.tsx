import css from "./NotFound.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub.example.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
     <div className={css.wrapper}>
        <div className="container">
      <div className={css.content}>
        <h1 className={css.code}>404</h1>
        <p className={css.message}>Упс! Схоже, ти заблукав, друже</p>
        <p className={css.text}>
         Сторінку, яку ти шукаєш - не існує
        </p>
        <Link href="/" className={css.button}>
          Повернутися на головну
        </Link>
      </div>
      </div>
    </div>
  );
}
