import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothica",
  description:
    "Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
