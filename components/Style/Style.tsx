"use client";

import css from "./Style.module.css";

import Image from "next/image";

import ThreadIcon from "@/public/style/Heading.png";
import PaletteIcon from "@/public/style/Heading-1.png";
import TShirtIcon from "@/public/style/Heading-2.png";

export default function Style() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.containerWrap}>
          <h2 className={css.title}>Обери свій унікальний стиль сьогодні</h2>

          <ul className={css.list}>
            <li className={css.listItem}>
              <Image src={ThreadIcon} alt="Thread" width={56} height={56} />
              <h3 className={css.titleOfCard}>Якість та натуральність</h3>
              <p className={css.cardInfo}>
                тільки приємні до тіла тканини, які зберігають
                форму навіть після десятків прань.
              </p>
            </li>
            <li className={css.listItem}>
              <Image src={PaletteIcon} alt="Palette" width={56} height={56} />
              <h3 className={css.titleOfCard}>Універсальний дизайн</h3>
              <p className={css.cardInfo}>
                базові кольори та локанічний стиль,
                що легко комбінується між собою.
              </p>
            </li>
            <li className={css.listItem}>
              <Image src={TShirtIcon} alt="T-Shirt" width={56} height={56} />
              <h3 className={css.titleOfCard}>Комфорт на кожен день</h3>
              <p className={css.cardInfo}>
                одяг, який не обмежує рухів і
                підходить для будь-якої ситуації.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}