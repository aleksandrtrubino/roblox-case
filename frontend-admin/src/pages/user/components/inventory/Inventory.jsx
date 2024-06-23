import React from 'react';
import styles from './Inventory.module.scss';
const pageNumbers = [1, 2, 3, 4, 5];

const Inventory = ({ inventory }) => {
  const getItemBorderColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'rgb(255, 193, 70)';
      case 'ultraRare':
        return 'rgb(255, 60, 53)';
      case 'rare':
        return 'rgb(149, 18, 255)';
      case 'uncommon':
        return 'rgb(107, 222, 53)';
      case 'common':
        return 'rgb(0, 225, 224)';
      default:
        return '#000000';
    }
  };

  return (
    <div className={styles.inventory}>
      <h2 className={styles.inventory__title}>Инвентарь пользователя</h2>
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
          <th>Предмет</th>
          <th>Возраст</th>
          <th>Категория</th>
          <th>Стоимость</th>
          <th>Время</th>
          <th></th>
        </thead>
        <tbody className={styles.body}>
          {inventory.map((item) => (
            <tr className={styles.item}>
              <td className={styles.info}>
                <div className={styles.info__container}>
                  <img
                    className={styles.info__image}
                    style={{ borderColor: getItemBorderColor(item.rarity) }}
                    src={item.image}
                    alt={item.name}
                  />
                  <span className={styles.info__name}>{item.name}</span>
                </div>
              </td>
              <td className={styles.info__age}>{item.age}</td>
              <td className={styles.info__categories}>
              <div className={styles.properties}>
                    <span
                      className={`${item.pumping === 'megaNeon' ? `${styles.mega__neon}` : ''} ${
                        styles.properties__icon
                      }`}>
                      M
                    </span>
                    <span
                      className={`${item.pumping === 'neon' ? `${styles.neon}` : ''} ${
                        styles.properties__icon
                      }`}>
                      N
                    </span>
                    <span
                      className={`${item.flyable === true ? `${styles.flyable}` : ''} ${
                        styles.properties__icon
                      }`}>
                      F
                    </span>
                    <span
                      className={`${item.ridible === true ? `${styles.ridible}` : ''} ${
                        styles.properties__icon
                      }`}>
                      R
                    </span>
                  </div>
              </td>
              <td className={styles.info__price}>{item.price}</td>
              <td className={styles.info__time}>{item.timestamp}</td>
              <td className={styles.info__buttons}>
                <button className={styles.button__delete}>Удалить предмет</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
