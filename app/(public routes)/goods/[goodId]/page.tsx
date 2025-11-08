import ReviewsSlider from '@/components/ReviewsSlider/ReviewsSlider';
import Product from '../../../../components/Product/Product';
import css from './ProductPage.module.css';
interface PageProps {
  params: {
    goodId: string;
  };
}

export default async function GoodPage({ params }: PageProps) {
  const { goodId } = await params;
  return (
    <>
      <Product goodId={goodId} />
      <div className="container">
        <div className={css.goodsReviews}>
          <p className={css.titleReviews}>Відгуки клієнтів</p>
          <button className={css.addReviews}>Залишити відгук</button>
        </div>
        <ReviewsSlider hasProductText={false} hasCenteredButtons={true} />
      </div>
    </>
  );
}
