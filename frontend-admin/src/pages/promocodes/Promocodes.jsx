import React from 'react';
import styles from './Promocodes.module.scss';
import promocodes from '../../data/promocodes.json';
import AddPromocode from './modules/AddPromocode/AddPromocode';
const pageNumbers = [1, 2, 3, 4, 5];

const Promocodes = () => {
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  return (
    <div className={styles.promocodes}>
      <div className={styles.promocodes__container}>
        <h2 className={styles.promocodes__title}>Список промокодов</h2>
        <button onClick={handleOpenAdd} className={styles.promocodes__add}>
          Добавить
        </button>
      </div>
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
        <thead className={styles.head}>
          <th>Промокод</th>
          <th>Сумма</th>
          <th>Использовано</th>
          <th>Осталось</th>
          <th>Дата создания</th>
          <th>Дата окончания</th>
          <th></th>
        </thead>
        <tbody className={styles.body}>
          {promocodes.map((promocode) => (
            <tr key={promocode.id}>
              <td>{promocode.promocode}</td>
              <td>{promocode.count}</td>
              <td>{promocode.used}</td>
              <td>{promocode.left}</td>
              <td>{promocode.timestamp}</td>
              <td>{promocode.timestampLeft}</td>
              <td>
                <div className={styles.body__buttons}>
                  <button className={styles.button__stop}>Прекратить</button>
                  <button className={styles.button__delete}>Удалить</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openAdd && <AddPromocode closeWindow={handleOpenAdd} />}
    </div>
  );
};

export default Promocodes;
