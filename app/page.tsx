import Filters from '@/components/Filters/Filters';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import Reviews from '@/components/Reviews/Reviews';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';
import Style from '@/components/Style/Style';

export default function Home() {
  return (
    <main>
      <Style />
      <PopularCategories />
      <Reviews />
      {/* <Filters></Filters> */}
      {/* <SidebarFilters></SidebarFilters> */}
    </main>
  );
}
