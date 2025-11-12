"use client";

import css from "./Style.module.css";

import Image from "next/image";

import ThreadIcon from "@/public/style/Heading.png";
import PaletteIcon from "@/public/style/Heading-1.png";
import TShirtIcon from "@/public/style/Heading-2.png";

import { useTranslate } from "@tolgee/react";

export default function Style() {
  const { t } = useTranslate();

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.containerWrap}>
          <h2 className={css.title}>{t("styleTitle")}</h2>

          <ul className={css.list}>
            <li className={css.listItem}>
              <Image src={ThreadIcon} alt="Thread" width={56} height={56} />
              <h3 className={css.titleOfCard}>{t("qualityTitle")}</h3>
              <p className={css.cardInfo}>{t("qualityDesc")}</p>
            </li>
            <li className={css.listItem}>
              <Image src={PaletteIcon} alt="Palette" width={56} height={56} />
              <h3 className={css.titleOfCard}>{t("designTitle")}</h3>
              <p className={css.cardInfo}>{t("designDesc")}</p>
            </li>
            <li className={css.listItem}>
              <Image src={TShirtIcon} alt="T-Shirt" width={56} height={56} />
              <h3 className={css.titleOfCard}>{t("comfortTitle")}</h3>
              <p className={css.cardInfo}>{t("comfortDesc")}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}