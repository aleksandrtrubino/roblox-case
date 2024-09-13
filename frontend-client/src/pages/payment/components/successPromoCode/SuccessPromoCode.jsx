import styles from './SuccessPromoCode.module.scss'

export const SuccessPromoCode = ({promoCode, onClose}) =>{

    return(
        <div className={styles.main}>
            <span className={styles.text}>
                {"Промокод на " + (promoCode.type.id === 1 ? "сумму " + promoCode.number : "+" + promoCode.number + " % к сумме пополнения") + " активирован"}
            </span>
            <button className={styles.button} onClick={()=>onClose()}>
                Понятно
            </button>
        </div>
    )
}