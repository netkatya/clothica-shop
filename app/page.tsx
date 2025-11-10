import Hero from '@/components/Hero/Hero';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularGoods from '@/components/PopularGoods/PopularGoods';
import RadioCart from '@/components/RadioCart/RadioCart';
import Reviews from '@/components/Reviews/Reviews';
import Style from '@/components/Style/Style';

export default function Home() {
  return (
    <main>
      <Hero />
      <Style />
      <PopularCategories />
      <PopularGoods />
      <Reviews />
      <RadioCart />
    </main>
  );
}
