import PopularCategories from '@/components/PopularCategories/PopularCategories';
import Reviews from '@/components/Reviews/Reviews';
import Style from '@/components/Style/Style';
import Product from '@/components/Product/[id]/Product';

export default function Home() {
  return (
    <main>
      <Style />
      <PopularCategories />
      <Product />
      <Reviews />
    </main>
  );
}
