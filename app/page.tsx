import GoodsList from '@/components/GoodsList/GoodsList';
import Hero from '@/components/Hero/Hero';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import Reviews from '@/components/Reviews/Reviews';
import Style from '@/components/Style/Style';

export default function Home() {
  return (
    <main>
      <Hero />
      <Style />
      <PopularCategories />
      <GoodsList />
      <Reviews />
    </main>
  );
}
