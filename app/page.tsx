import Hero from "@/components/Hero/Hero";
import PopularCategories from "@/components/PopularCategories/PopularCategories";
import Reviews from "@/components/Reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularCategories />
      <Reviews />
    </main>
  );
}
