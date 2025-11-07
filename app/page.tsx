import Reviews from "@/components/Reviews/Reviews";
import Product from "@/components/Product/[id]/Product";

export default function Home() {
  return (
    <main>
      <Product />
      <Reviews />
    </main>
  );
}
