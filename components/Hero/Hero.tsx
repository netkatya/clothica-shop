import css from './Hero.module.css';

const Hero = () => {
    return (
        <section>
            <div className={css.hero}>
                <h1>Знайди свій стиль з Clothica вже сьогодні!</h1>
                <p>Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо базовий одяг, який легко комбінується та підходить для будь-якої нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди будуть актуальними.</p>
                <a href="#PopularGoods" className={css.link_primary}>До товарів</a>
                <a href="#PopularCategories" className={css.link_secondary}>Дослідити категорії</a>
            </div>
        </section>
    );
}

export default Hero;