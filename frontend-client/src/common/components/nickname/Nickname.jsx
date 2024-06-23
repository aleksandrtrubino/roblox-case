import styles from "./nickname.module.scss";

export const Nickname = () => {
  return (
    <div className={styles.nickname}>
        <div className={styles.nickname_wrapper}>
            <span className={styles.nickname_title}>Куда выводим?</span>
            <input className={styles.nickname_input} type="text" placeholder="Введите никнейм" />
            <button className={styles.nickname_button}>Продолжить</button>
        </div>
    </div>
  )
}
