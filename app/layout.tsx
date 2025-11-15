import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTopBtn from '@/components/ScrollToTopBtn/ScrollToTopBtn';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import FavoriteButton from '@/components/FavoritesButton/FavoritesButton';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clothica',
  description:
    'Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.',
  openGraph: {
    type: 'website',
    url: 'https://clothica-shop.vercel.app',
    title: 'Clothica',
    description:
      'Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.',
    images: [
      {
        url: 'https://clothica-shop.vercel.app/img/main.png',
        width: 1200,
        height: 630,
        alt: 'Clothica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourTwitterHandle',
    title: 'Clothica',
    description:
      'Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.',
    images: ['https://clothica-shop.vercel.app/img/main.png'],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <FavoriteButton />
            <Footer />

            <ScrollToTopBtn />
            <div id="modal-root"></div>
          </AuthProvider>
        </TanStackProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
