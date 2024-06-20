import React from 'react';

import { PaymentMethod } from './components/paymentMethod/PaymentMethod';

import styles from './payment.module.scss';

let minimalCount = 25;
let arriveCount = 100;

export const Payment = () => {

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles.payment}>
      <div className={styles.payment_header}>
        <svg className={styles.payment_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22,17a4,4,0,1,1-4-4A4,4,0,0,1,22,17ZM21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2h9.54A5.99,5.99,0,0,1,22,12.54V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Z" />
        </svg>
        <span className={styles.payment_title}>Пополнение баланса</span>
      </div>
      <div className={styles.payment_wrapper}>
        <div className={`${styles.payment_left} ${styles.left}`}>
          <ul className={`${styles.left_methods} ${styles.methods}`}>
            <PaymentMethod prompt={'cards'} />
            <PaymentMethod prompt={'qiwi'} />
            <PaymentMethod prompt="sbp" />
            <PaymentMethod prompt="sber" />
            <PaymentMethod />
            <PaymentMethod />
          </ul>
          <span className={styles.methods_alert}>
            Для пополнения баланса вы будете перемещены на сайт платежной системы.
          </span>
        </div>
        <div className={`${styles.payment_right} ${styles.right}`}>
          <div className={`${styles.right_selected} ${styles.selected}`}>
            <div className={styles.selected_method}>
              <span className={styles.selected_title}>Выбранный способ оплаты</span>
              <span className={styles.selected_option}>CARDS</span>
            </div>
            <div className={styles.selected_picture}></div>
          </div>
          <div className={`${styles.right_promocode} ${styles.promocode}`}>
            <div className={`${styles.promocode_field} ${styles.field}`}>
              <svg
                className={styles.field_icon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M14 3v18H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5V4a1 1 0 0 1 1-1h11zm2 0h5a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1h-5V3z" />
                </g>
              </svg>
              <input className={styles.field_input} type="text" placeholder="Промокод" />
            </div>
            <button className={styles.promocode_confirm}>Применить</button>
          </div>
          <div className={`${styles.right_refill} ${styles.refill}`}>
            {/* <div className={`${styles.refill_minimal} ${styles.minimal}`}>
              <span className={styles.minimal_title}>Минимальная сумма </span>
              <span className={styles.minimal_count}>{minimalCount}</span>
              <span className={styles.minimal_valute}>M</span>
            </div> */}
            <div className={styles.refill_field}>
              <div className={styles.refill_left}>
                <svg
                  className={styles.refill_icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  className={styles.refill_input}
                  type="number"
                  min={25}
                  max={99999}
                  placeholder="Сумма"
                />
              </div>
              <svg
                className={styles.refill_convert}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
              </svg>
              <div className={styles.refill_right}>
                <span className={styles.refill_total}>200 M</span>
              </div>
            </div>
            <div className={`${styles.refill_selectors} ${styles.selectors}`}>
              <button className={styles.selectors_button}>100</button>
              <button className={styles.selectors_button}>🤘 150</button>
              <button className={styles.selectors_button}>200</button>
              <button className={styles.selectors_button}>250</button>
              <button className={styles.selectors_button}>500</button>
            </div>
          </div>
          <button className={styles.recharge}>
            <span className={styles.recharge_title}>Пополнить</span>
            <svg
              className={styles.recharge_icon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M22,17a4,4,0,1,1-4-4A4,4,0,0,1,22,17ZM21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2h9.54A5.99,5.99,0,0,1,22,12.54V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
