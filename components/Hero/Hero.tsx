'use client';

import css from './Hero.module.css';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

import { useTranslations } from 'next-intl';

const Hero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const t = useTranslations('HeroSection')

  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.all_hero_content}>
          <div className={css.hero_content}>
            <div className={css.text_wrapper}>
              <h1 className={css.hero_title}>
                {t("title")}
              </h1>
              <p className={css.hero_text}>
                {t("text")}
              </p>
            </div>
            <div className={css.hero_links}>
              <a href="#PopularGoods" className={css.link_primary}>
                {t('buttonToGoods')}
              </a>
              <a href="#PopularCategories" className={css.link_secondary}>
                {t('buttonToCategories')}
              </a>
            </div>
          </div>
          {isClient && (
            <>
              {isMobile && (
                <Image
                  src="/img/hero/Hero-Image-mobile.png"
                  alt="Hero Image"
                  width={335}
                  height={335}
                  className={css.hero_image}
                />
              )}
              {isTablet && (
                <Image
                  src="/img/hero/Hero-Image-tablet.png"
                  alt="Hero Image"
                  width={336}
                  height={425}
                  className={css.hero_image}
                />
              )}
              {isDesktop && (
                <Image
                  src="/img/hero/Hero-Image-desktop.png"
                  alt="Hero Image"
                  width={640}
                  height={394}
                  className={css.hero_image}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
