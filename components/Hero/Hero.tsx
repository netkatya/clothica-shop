'use client';

import css from './Hero.module.css';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

const Hero = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
    const isDesktop = useMediaQuery({ minWidth: 1440 });

    return (
        <section className={css.hero}>
            <div className={css.hero_content}>
                <div className={css.text_wrapper}>
                    <h1 className={css.hero_title}>Знайди свій стиль з Clothica вже сьогодні!</h1>
                    <p className={css.hero_text}>Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо базовий одяг, який легко комбінується та підходить для будь-якої нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди будуть актуальними.</p>
                </div>
                <div className={css.hero_links}>
                    <a href="#PopularGoods" className={css.link_primary}>До товарів</a>
                    <a href="#PopularCategories" className={css.link_secondary}>Дослідити категорії</a>
                </div>
            </div>
            {isClient && 
            <>
                {isMobile && <Image src="/img/hero/hero-image-mobile.png" alt="Hero Image" width={335} height={335} className={css.hero_image} />}
                {isTablet &&<Image src="/img/hero/hero-image-tablet.png" alt="Hero Image" width={336} height={425} className={css.hero_image} />}
                {isDesktop &&<Image src="/img/hero/hero-image-desktop.png" alt="Hero Image" width={640} height={394} className={css.hero_image} />}
            </>
            }
        </section>
    );
}

export default Hero;