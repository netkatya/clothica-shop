import PopularCategories from "@/components/PopularCategories/PopularCategories";
import Reviews from "@/components/Reviews/Reviews";
import Style from "@/components/Style/Style";

export default function Home() {
  return (
    <main>
      <Style />
      <PopularCategories />
      <Reviews />
    </main>
  );
}
