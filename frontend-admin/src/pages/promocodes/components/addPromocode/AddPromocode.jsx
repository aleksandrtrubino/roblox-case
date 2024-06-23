import React from 'react'
import styles from './AddPromocode.module.scss'

const AddPromocode = ({closeWindow}) => {
  return (
    <div className={styles.add}>
        <div className={styles.add__container}>
        <button onClick={closeWindow} className={styles.button__close}>
          ✕
        </button>
        <h2 className={styles.add__title}>Добавить промокод</h2>
        <div className={styles.promocode}>
            <div className={styles.promocode__block}>
                <span>Промокод</span>
                <input type="text" />
            </div>
            <div className={styles.promocode__block}>
              <span>Сумма к пополнению</span>
              <input type="text" />
            </div>
            <div className={styles.promocode__infinite}>
              <input type="checkbox" name="" id="" />
              <span>Безлимитный промокод</span>
            </div>
            <div className={styles.promocode__block}>
              <span>Время окончания действия</span>
              <input type="date" />
            </div>
            <div className={styles.promocode__block}>
              <span>Количество использований</span>
              <input type="text" />
            </div>
        </div>
        <button className={styles.button__add}>Добавить</button>
        </div>
    </div>
  )
}

export default AddPromocode
