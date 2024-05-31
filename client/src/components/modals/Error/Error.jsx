import styles from "./error.module.scss";

import techPicture from "../../../assets/static/techWork.png";

export const Error = () => {
  return (
    <div className={styles.error}>
        <div className={styles.error_wrapper}>
            <div className={styles.error_header}>
                
            </div>
            <div className={`${styles.error_body} ${styles.body}`}>
            <img className={styles.body_picture} src={techPicture} alt="" />
            <span className={styles.body_description}>
                Скорее всего в Roblox произошли изменения. Пожалуйста, подождите, пока его работа не возобновится.
            </span>
            </div>
            <button className={styles.error_button}>Подожду</button>
        </div>
    </div>
  )
}
