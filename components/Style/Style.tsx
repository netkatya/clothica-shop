'use client';

import css from './Style.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ThreadIcon from '@/public/style/Heading.png';
import PaletteIcon from '@/public/style/Heading-1.png';
import TShirtIcon from '@/public/style/Heading-2.png';

export default function Style() {
  const t = useTranslations('StyleSection');

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.containerWrap}>
          <h2 className={css.title}>{t('title')}</h2>

          <ul className={css.list}>
            <li className={css.listItem}>
              <Image src={ThreadIcon} alt={t('card1Title')} width={56} height={56} />
              <h3 className={css.titleOfCard}>{t('card1Title')}</h3>
              <p className={css.cardInfo}>{t('card1Text')}</p>
            </li>
            <li className={css.listItem}>
              <Image src={PaletteIcon} alt={t('card2Title')} width={56} height={56} />
              <h3 className={css.titleOfCard}>{t('card2Title')}</h3>
              <p className={css.cardInfo}>{t('card2Text')}</p>
            </li>
            <li className={css.listItem}>
              <Image src={TShirtIcon} alt={t('card3Title')} width={56} height={56} />
              <h3 className={css.titleOfCard}>{t('card3Title')}</h3>
              <p className={css.cardInfo}>{t('card3Text')}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}