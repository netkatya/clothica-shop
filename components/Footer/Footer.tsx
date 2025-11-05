import Link from "next/link";
import css from "./Footer.module.css";
export default function Footer() {
  return (
    <section className={css.section}>
      <div className={`container ${css.containerFooter}`}>
        <div className={css.linksContainer}>
          <a href="" aria-label="На головну">
            <svg width="84" height="36" aria-hidden="true">
              <use href="/symbol-defs.svg#icon-company-logo"></use>
            </svg>
          </a>
          <div className={css.navigationList}>
            <h2 className={css.menu}>Меню</h2>
            <ul className={css.navigationList}>
              <li className={css.navigation}>
                <a href="">Головна</a>
              </li>
              <li className={css.navigation}>
                <a href="">Товари</a>
              </li>
              <li className={css.navigation}>
                <a href="">Категорії</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.subscribeContainer}>
          <h3 className={css.subscribe}>Підписатися</h3>
          <p className={css.text}>
            Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
          </p>
          <div className={css.containerSubscribe}>
            <input
              type="mail"
              placeholder="Введіть ваш email"
              className={css.input}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <button type="submit" className={css.button}>
              Підписатися
            </button>
          </div>
        </div>
        <div className={css.socials}>
          <p className={css.rights}>
            {new Date().getFullYear()} Clothica. Всі права захищені.
          </p>
          <ul className={css.socialContainer}>
            <li>
              <Link
                href="https://www.facebook.com"
                aria-label="facebook"
                target="_blank"
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-facebook"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com"
                aria-label="instagram"
                target="_blank"
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-instagram"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://x.com" aria-label="x" target="_blank">
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-x"></use>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com"
                aria-label="youtube"
                target="_blank"
              >
                <svg width="32" height="32" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-youtube"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
