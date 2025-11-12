
import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import TolgeeProviderWrapper from "@/components/LanguageSwitcher/TolgeeProviderWrapper";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

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
    url: 'https://online-shop-chi-flame.vercel.app',
    title: 'Clothica',
    description:
      'Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.',
    images: [
      {
        url: 'https://online-shop-chi-flame.vercel.app/img/main-page.png',
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
    images: ['https://online-shop-chi-flame.vercel.app/img/main-page.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <TolgeeProviderWrapper>
          <TanStackProvider>
            <AuthProvider>
              <Header />
              <LanguageSwitcher />
              <main>{children}</main>
              <div id="modal-root"></div>
              <Footer />
              <ScrollToTopBtn />
            </AuthProvider>
          </TanStackProvider>

          <CookieBanner />

        </TolgeeProviderWrapper>
      </body>
    </html>
  );
}