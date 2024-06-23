import React from 'react';

import styles from './Transactions.module.scss';
const pageNumbers = [1, 2, 3, 4, 5]

const Transactions = ({ transactions }) => {
  const getStatusPayment = (status) => {
    if (status === 'success') {
      return 'Успешно';
    } else if (status === 'failed') {
      return 'Не успешно';
    } else if (status === 'pending') {
      return 'В ожидании';
    }

    return '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  return (
    <div className={styles.transactions}>
      <h2 className={styles.title}>История пополнения</h2>
      <div className={styles.payments__control}>
        <div className={styles.pagination}>
          {pageNumbers.map((number) => (
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
        <thead className={styles.header}>
          <tr>
            <th className={styles.table__header}>Статус</th>
            <th className={styles.table__header}>Сумма</th>
            <th className={styles.table__header}>Способ оплаты</th>
            <th className={styles.table__header}>ID транзакции</th>
            <th className={styles.table__header}>Время выполнения</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className={styles.body__status}><span className={`${transaction.status === 'success' ? styles.success : ''} ${transaction.status === 'failed' ? styles.failed : ''} ${transaction.status === 'pending' ? styles.pending : ''}`}>{getStatusPayment(transaction.status)}</span></td>
              <td>{transaction.amount}</td>
              <td>{transaction.paymentMethod}</td>
              <td>{transaction.transactionId}</td>
              <td className={styles.time}>{formatDate(transaction.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
