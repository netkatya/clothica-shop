import Hero from '@/components/Hero/Hero';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import Reviews from '@/components/Reviews/Reviews';
import Style from '@/components/Style/Style';
import Product from '@/components/Product/Product';

export default function Home() {
  return (
    <main>
      <Hero />
      <Style />
      <PopularCategories />
      <Product goodId="1" />
      <Reviews />
    </main>
  );
}
