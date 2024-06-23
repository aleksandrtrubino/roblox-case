import React from 'react'
import styles from './support.module.scss'
import { Close } from '../close/Close'

export const Support = () => {
  return (
    <div className={styles.support}>
        <div className={styles.support_wrapper}>
            <div className={styles.support_header}>
                <span className={styles.support_title}>Техническая поддержка</span>
                <Close />
            </div>
            <span className={styles.support_description}>Связаться с нами можно в официальном сообществе ВКонтакте или использовать виджет, который находится в углу сайта</span>
        </div>
    </div>
  )
}
