import css from './RadioCart.module.css';

export default function RadioCart() {
  return (
    <div className={css.radioInputs}>
      {/* Visa */}
      <label className={css.radioLabel}>
        <input className={css.radioInput} type="radio" name="payment" />
        <span className={css.radioTile}>
          <span className={css.radioIcon}>{/* Visa PNG oe SVG */}</span>
          <span className={css.radioText}>Visa</span>
        </span>
      </label>

      {/* Mastercard */}
      <label className={css.radioLabel}>
        <input className={css.radioInput} type="radio" name="payment" />
        <span className={css.radioTile}>
          <span className={css.radioIcon}>{/* Mastercard PNG or SVG */}</span>
          <span className={css.radioText}>Mastercard</span>
        </span>
      </label>
    </div>
  );
}
