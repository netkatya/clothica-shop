import css from './RadioCart.module.css';
import Image from 'next/image';

export default function RadioCart() {
  return (
    <div className={css.radioInputs}>
      {/* Visa */}
      <label className={css.radioLabel}>
        <input className={css.radioInput} type="radio" name="payment" defaultChecked={true} />
        <span className={css.radioTile}>
            <Image
              src="/img/payment/visa-logo.png"
              alt="Visa Logo"
              width={120}
              height={80}
            />
        </span>
      </label>

      {/* Mastercard */}
      <label className={css.radioLabel}>
        <input className={css.radioInput} type="radio" name="payment" />
        <span className={css.radioTile}>
            <Image
              src="/img/payment/mastercard-logo.png"
              alt="Visa Logo"
              width={120}
              height={80}
            />
        </span>
      </label>
    </div>
  );
}
