import React, { useState } from 'react';
import styles from './Payments.module.scss';
import { Link } from 'react-router-dom';
import payments from '../../data/payments.json';
const pageNumbers = [1, 2, 3, 4, 5];

const Payments = () => {
  const getStatusPayment = (paymentStatus) => {
    if (paymentStatus === 'pending') {
      return 'В ожидании';
    } else if (paymentStatus === 'failure') {
      return 'Отменено';
    } else if (paymentStatus === 'success') {
      return 'Успешно';
    }

    return '';
  };

  const getPaymentMethod = (paymentMethod) => {
    if (paymentMethod === 'card') {
      return 'Карта';
    } else if (paymentMethod === 'paypal') {
      return 'PayPal';
    } else if (paymentMethod === 'bank_transfer') {
      return 'Банковский перевод';
    }

    return '';
  };

  return (
    <div className={styles.payments}>
      <h2 className={styles.payments__title}>История пополнений</h2>
      <div className={styles.payments__control}>
        <div className={styles.pagination}>
          {pageNumbers.map( (number) => (
            <button className={styles.page__button}>{number}</button>
          ))}
        </div>
        <div className={styles.control__manage}>
          <input className={styles.control__search} type="text" placeholder="Поиск" />
          <select className={styles.control__sorting} value="Сортировка">
            <option className={styles.sorting__set} value="">
              Сортировка
            </option>
            <option className={styles.sorting__set} value="time_desc">
              По времени (убывание)
            </option>
            <option className={styles.sorting__set} value="time_asc">
              По времени (возрастание)
            </option>
            <option className={styles.sorting__set} value="amount_desc">
              По сумме (убывание)
            </option>
            <option className={styles.sorting__set} value="amount_asc">
              По сумме (возрастание)
            </option>
            <option className={styles.sorting__set} value="payment_method">
              По способу оплаты
            </option>
            <option className={styles.sorting__set} value="status">
              По статусу
            </option>
          </select>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr>
            <th className={styles.head__title}>Статус</th>
            <th className={styles.head__title}>Сумма</th>
            <th className={styles.head__title}>Способ оплаты</th>
            <th className={styles.head__title}>Идентификатор</th>
            <th className={styles.head__title}>Время</th>
            <th className={styles.head__title}>Пользователь</th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className={`${styles.body__item}`}>
                <span
                  className={`${styles.payment__border} ${
                    payment.status === 'pending' ? styles.pending : ''
                  } ${payment.status === 'failure' ? styles.failure : ''} ${
                    payment.status === 'success' ? styles.success : ''
                  }`}>
                  {getStatusPayment(payment.status)}
                </span>
              </td>
              <td className={styles.body__item}>{payment.amount}</td>
              <td className={styles.body__item}>{getPaymentMethod(payment.method)}</td>
              <td className={styles.body__item}>{payment.id}</td>
              <td className={styles.body__item}>{payment.timestamp}</td>
              <td className={`${styles.body__item} ${styles.body__user}`}>
                <Link to={`/user/${payment.userId}`}>
                  <button className={styles.button__user}>Профиль пользователя</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
