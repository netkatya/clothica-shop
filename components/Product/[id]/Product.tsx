import css from './Product.module.css';
import Image from 'next/image';
import tShirtImg from '../../../public/img/Placeholder Image.png';
import Stars from '@/components/Stars/Stars';

export default function Product() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.content}>
          <Image
            src={tShirtImg}
            alt="Опис фото"
            height={373}
            className={css.image}
            priority
          />
          <div className={css.column}>
            <div className={css.productDescription}>
              <p className={css.breadcrumbs}>
                Всі товари &nbsp;&gt;&nbsp; <span>Базова футболка</span>
              </p>
              <h1 className={css.title}>Базова футболка</h1>
              <div className={css.details}>
                <p className={css.price}>750 грн</p>
                <span>|</span>
                <Stars rating={4.5} />
                <span className={css.reviews}> (4.5) • 10 відгуків</span>
              </div>

              <p className={css.text}>
                Універсальний елемент гардеробу на кожен день. Виконана з м’якої
                бавовни, приємна до тіла та добре тримає форму. Лаконічний
                дизайн дозволяє легко поєднувати футболку з джинсами, шортами чи
                під жакет. Ідеальний вибір для тих, хто цінує комфорт і
                мінімалізм.
              </p>
              <div className={css.sizeSelect}>
                <label className={css.label}>Розмір :</label>
                <select className={css.size}>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
              <div className={css.inputContainer}>
                <button className={css.addToBucket}>Додати в кошик</button>
                <input className={css.quantityInput}></input>
              </div>
            </div>
            <button className={css.buyNow}>Купити зараз</button>
            <p className={css.freeDelivery}>
              Безкоштовна доставка для замовлень від 1000 грн
            </p>
            <div>
              <h2 className={css.descTitle}>Опис</h2>
              <p className={css.descText}>
                Базова футболка Clothica — це ідеальний вибір для тих, хто цінує
                комфорт, якість та універсальність. Виготовлена зі 100%
                натуральної бавовни, вона приємна до тіла, добре пропускає
                повітря та підходить для щоденного носіння у будь-яку пору року.{' '}
                <br />
                <br />
                Лаконічний дизайн без зайвих деталей робить футболку
                універсальною основою гардеробу: її легко поєднувати з джинсами,
                шортами, брюками чи навіть під піджак. Прямий крій забезпечує
                свободу рухів, а м’який матеріал зберігає форму навіть після
                багаторазових прань.
                <br />
                <br />
                Футболка представлена у класичних та пастельних кольорах, щоб
                кожен міг знайти свій ідеальний варіант. Вона стане базою як для
                мінімалістичного стилю, так і для створення багатошарових
                образів.
                <br />
                <br />
                Основні характеристики
              </p>
              <ul className={css.listDisc}>
                <li>Матеріал: 100% бавовна</li>
                <li>Крій: прямий, унісекс</li>
                <li>Горловина: круглий виріз</li>
                <li>Догляд: машинне прання при 30°</li>
                <li>Доступні розміри: XS–XXL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
