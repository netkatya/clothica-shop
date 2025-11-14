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

const ReviewSchema = Yup.object().shape({
  author: Yup.string().min(2, "Ім'я занадто коротке").required("Введіть ім'я"),
  comment: Yup.string()
    .min(5, 'Відгук занадто короткий')
    .required('Введіть відгук'),
  rate: Yup.number()
    .min(1, 'Оцініть товар')
    .max(5, 'Оцінка не може бути більше 5')
    .required('Оцініть товар'),
});

export default function GoodPage() {
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

  if (isLoading) return <div className={css.loading}>Завантаження…</div>;
  if (error || !good)
    return <div className={css.loading}>Помилка завантаження товару</div>;

  return (
    <>
      <Product good={good} />

      <div className="container">
        <div className={css.goodsReviews}>
          <p className={css.titleReviews}>Відгуки клієнтів</p>
          <button className={css.addReviews} onClick={openModal}>
            Залишити відгук
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
              У цього товару ще немає відгуків
            </p>
            <button
              className={`${css.addReviews} ${css.noMargin}`}
              onClick={openModal}
            >
              Залишити відгук
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

            <h2 className={css.titleModal}>Залишити відгук</h2>

            <Formik
              initialValues={{ author: '', comment: '', rate: 0 }}
              validationSchema={ReviewSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, isSubmitting, values }) => (
                <Form className={css.form}>
                  <div className={css.inpBox}>
                    <label htmlFor="author" className={css.inpName}>
                      Ваше ім’я
                    </label>
                    <Field
                      type="text"
                      id="author"
                      name="author"
                      className={`${css.input} ${errors.author && touched.author ? css.inputError : ''}`}
                      placeholder="Ваше ім’я"
                    />
                    <ErrorMessage
                      name="author"
                      component="span"
                      className={css.error}
                    />
                  </div>

                  <div className={css.inpBox}>
                    <label htmlFor="comment" className={css.inpName}>
                      Ваш відгук
                    </label>
                    <Field
                      as="textarea"
                      id="comment"
                      name="comment"
                      rows={5}
                      className={`${css.textarea} ${errors.comment && touched.comment ? css.textareaError : ''}`}
                      placeholder="Ваш відгук"
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
                    Надіслати
                  </button>
                </Form>
              )}
            </Formik>
          </ProductModal>
        )}
      </div>
    </>
  );
}
