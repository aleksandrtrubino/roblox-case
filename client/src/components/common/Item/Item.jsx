
import styles from "./item.module.scss"

export const Item = () => {


  return (
    <li className={styles.item}>
      <div className={`${styles.item_wrapper} `}>
        <div className={`${styles.item_properties} ${styles.properties}`}>
            <span className={`${styles.properties_name} `}>M</span>
            <span className={`${styles.properties_name} `}>N</span>
            <span className={`${styles.properties_name} `}>F</span>
            <span className={`${styles.properties_name} `}>R</span>
        </div>
        <img src='' className={styles.item_picture}></img>
        <div className={`${styles.item_description} ${styles.description}`}>
          <span className={styles.description_age}></span>
          <span className={styles.description_name}></span>
        </div>
      </div>
    </li>
  )
}
