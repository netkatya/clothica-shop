'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ReviewsSlider from '@/components/ReviewsSlider/ReviewsSlider';
import Product from '@/components/Product/Product';
import ProductModal from '@/components/ProductModal/ProductModal';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StarPicker from '../../../../components/StarRating/StarRating';

import { createFeedbackClient, fetchGoodById } from '@/lib/api/clientApi';
import { FeedbackPost } from '@/types/feedback';

import css from './ProductPage.module.css';
import Loading from '@/app/loading';

import { useTranslations } from 'next-intl';

export default function GoodPage() {
  const t = useTranslations('GoodPage');

  const ReviewSchema = Yup.object().shape({
    author: Yup.string().min(2, t('authorTooShort')).required(t('authorRequired')),
    comment: Yup.string()
      .min(5, t('commentTooShort'))
      .required(t('commentRequired')),
    rate: Yup.number()
      .min(1, t('rateRequired'))
      .max(5, t('rateMax'))
      .required(t('rateRequired')),
  });

  const params = useParams<{ goodId: string }>();
  const goodId = params.goodId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();

  const {
    data: good,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['good', goodId],
    queryFn: () => fetchGoodById(goodId).then(r => r.data),
  });

  const handleSubmit = async (values: {
    author: string;
    comment: string;
    rate: number;
  }) => {
    if (!goodId || !good) return;

    const feedback: FeedbackPost = {
      author: values.author,
      comment: values.comment,
      rate: values.rate,
      good: goodId,
      category: good.category._id,
    };

    await createFeedbackClient(feedback);

    await queryClient.invalidateQueries({ queryKey: ['good', goodId] });
    await queryClient.invalidateQueries({ queryKey: ['feedbacks', goodId] });

    closeModal();
  };

  if (isLoading) return <Loading />;
  if (error || !good)
    return <div className={css.loading}>{t('loadError')}</div>;

  return (
    <>
      <Product good={good} />

      <section className="container" id="reviews">
        <div className={css.goodsReviews}>
          <p className={css.titleReviews}>{t('reviewsTitle')}</p>
          <button className={css.addReviews} onClick={openModal}>
            {t('addReview')}
          </button>
        </div>

        {good.feedbackCount > 0 ? (
          <ReviewsSlider
            goodId={goodId}
            hasProductText={false}
            hasCenteredButtons={true}
          />
        ) : (
          <div className={css.emptyStateContainer}>
            <p className={css.emptyStateTitle}>
              {t('noReviews')}
            </p>
            <button
              className={`${css.addReviews} ${css.noMargin}`}
              onClick={openModal}
            >
              {t('addReview')}
            </button>
          </div>
        )}

        {isModalOpen && (
          <ProductModal onClose={closeModal}>
            <button type="button" className={css.closeBtn} onClick={closeModal}>
              <svg className="icon" width={14} height={14}>
                <use href="/symbol-defs.svg#icon-close"></use>
              </svg>
            </button>

            <h2 className={css.titleModal}>{t('modalTitle')}</h2>

            <Formik
              initialValues={{ author: '', comment: '', rate: 0 }}
              validationSchema={ReviewSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, isSubmitting, values }) => (
                <Form className={css.form}>
                  <div className={css.inpBox}>
                    <label htmlFor="author" className={css.inpName}>
                      {t('authorLabel')}
                    </label>
                    <Field
                      type="text"
                      id="author"
                      name="author"
                      className={`${css.input} ${errors.author && touched.author ? css.inputError : ''}`}
                      placeholder={t('authorPlaceholder')}
                    />
                    <ErrorMessage
                      name="author"
                      component="span"
                      className={css.error}
                    />
                  </div>

                  <div className={css.inpBox}>
                    <label htmlFor="comment" className={css.inpName}>
                      {t('commentLabel')}
                    </label>
                    <Field
                      as="textarea"
                      id="comment"
                      name="comment"
                      rows={5}
                      className={`${css.textarea} ${errors.comment && touched.comment ? css.textareaError : ''}`}
                      placeholder={t('commentPlaceholder')}
                    />
                    <ErrorMessage
                      name="comment"
                      component="span"
                      className={css.error}
                    />
                  </div>

                  <StarPicker
                    defaultValue={values.rate}
                    onChange={value => setFieldValue('rate', value)}
                  />

                  <button
                    className={css.btnReviews}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t('submitButton')}
                  </button>
                </Form>
              )}
            </Formik>
          </ProductModal>
        )}
      </section>
    </>
  );
}
