import ReviewsSlider from '../ReviewsSlider/ReviewsSlider';
import css from './Reviews.module.css';

export default function Reviews() {
  return (
    <section className={css.section}>
      <div className="container">
        <div>
          <h2 className={css.title}>Останні відгуки</h2>
          <ReviewsSlider />
        </div>
      </div>
    </section>
  );
}
