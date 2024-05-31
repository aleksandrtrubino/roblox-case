import styles from "./history.module.scss"

export const History = () => {
  return (
    <div className={styles.history}>
      <div className={styles.history_wrapper}>

        {/* Список предметов на вывод */}
        {/* <ul className={`${styles.history_list}`}>
          <li className={styles.history_item}>
            
          </li>
        </ul> */}

        {/* Плашка о пустых предметах */}
        <div className={`${styles.history_none} ${styles.none}`}>
          <span className={styles.none_title}>У вас еще нет выводов</span>
        </div>

        
      </div>
      <div className={`${styles.history_footer} ${styles.footer}`}>
        <span className={styles.footer_title}>Вывод происходит до истечения времени или одобрения модерации</span>
      </div>
    </div>
  )
}
