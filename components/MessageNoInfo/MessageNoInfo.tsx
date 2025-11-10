import Link from "next/link";
import styles from "./MessageNoInfo.module.css";

type MessageNoInfoProps = {
  text: string;
  buttonText: string;
  route?: string | null;
  onClick?: (() => void) | null;
};

export default function MessageNoInfo({
  text,
  buttonText,
  route = null,
  onClick = null,
}: MessageNoInfoProps) {
  return (
    <div className={styles.noOrdersWrapper}>
      <p className={styles.messageText}>{text}</p>

      {route ? (
        <Link href={route} className={styles.shopButton}>
          {buttonText}
        </Link>
      ) : (
        <button onClick={onClick!} className={styles.shopButton}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

//examples of using MessageNoInfo:

/* 
  <MessageNoInfo 
    text={"У цього товару ще немає відгуків"} 
    buttonText={"Залишити відгук"} 
    onClick={openReviewModal}
  /> 
*/

/*
  <MessageNoInfo
    text="У вас ще не було жодних замовлень! Мерщій до покупок!"
    buttonText="До покупок"
    route="/goods"
  />
*/