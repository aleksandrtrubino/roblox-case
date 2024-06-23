import React from "react";
import styles from "./unknown.module.scss";

export const Unknown = () => {

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles.unknown}>
      <div className={styles.unknown_wrapper}>
        <span className={styles.unknown_title}>Не удалось найти страницу 🙈</span>
        <button className={styles.unknown_button}>
          Вернутся
        </button>
      </div>
    </div>
  )
}
