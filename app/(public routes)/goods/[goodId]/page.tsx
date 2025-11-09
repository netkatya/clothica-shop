'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import ReviewsSlider from '@/components/ReviewsSlider/ReviewsSlider';
import Product from '../../../../components/Product/Product';
import css from './ProductPage.module.css';
import ProductModal from '../../../../components/ProductModal/ProductModal';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StarPicker from '../../../../components/StarRating/StarRating';

const ReviewSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Ім'я занадто коротке")
    .required("Введіть ім'я"),
  message: Yup.string()
    .min(5, 'Відгук занадто короткий')
    .required('Введіть відгук'),
});

export default function GoodPage() {
  const params = useParams<{ goodId: string }>();
  const goodId = params.goodId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [reviews, setReviews] = useState<
    { username: string; message: string }[]
  >([]);

  const handleSubmit = (values: { username: string; message: string }) => {
    setReviews(prev => [...prev, values]);
    console.log('Новий відгук:', values);
    closeModal();
  };

  return (
    <>
      <Product goodId={goodId} />
      <div className="container">
        <div className={css.goodsReviews}>
          <p className={css.titleReviews}>Відгуки клієнтів</p>
          <button className={css.addReviews} onClick={openModal}>
            Залишити відгук
          </button>
        </div>
        <ReviewsSlider
          reviews={reviews}
          hasProductText={false}
          hasCenteredButtons={true}
        />
        {isModalOpen && (
          <ProductModal onClose={closeModal}>
            <button type="button" className={css.closeBtn} onClick={closeModal}>
              ×
            </button>

            <h2 className={css.titleModal}>Залишити відгук</h2>
            <Formik
              initialValues={{ username: '', message: '' }}
              validationSchema={ReviewSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className={css.form}>
                  <div className={css.inpBox}>
                    <label htmlFor="username" className={css.inpName}>
                      Ваше ім’я
                    </label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className={`${css.input} ${
                        errors.username && touched.username
                          ? css.inputError
                          : ''
                      }`}
                      placeholder="Ваше ім’я"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div className={css.inpBox}>
                    <label htmlFor="message" className={css.inpName}>
                      Ваш відгук
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={5}
                      className={`${css.textarea} ${
                        errors.message && touched.message
                          ? css.textareaError
                          : ''
                      }`}
                      placeholder="Ваш відгук"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <StarPicker />
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
