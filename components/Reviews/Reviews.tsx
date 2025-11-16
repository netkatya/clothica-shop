import ReviewsSlider from '../ReviewsSlider/ReviewsSlider';
import css from './Reviews.module.css';
import { useTranslations } from 'next-intl';

export default function Reviews() {
  const t = useTranslations('ReviewsSection');

  return (
    <section className={css.section}>
      <div className="container">
        <div>
          <h2 className={css.title}>{t('title')}</h2>
          <ReviewsSlider />
        </div>
      </div>
    </section>
  );
}
