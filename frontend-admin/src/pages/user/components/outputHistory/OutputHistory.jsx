import React from 'react';
import CaseHistory from '../caseHistory/CaseHistory';
import styles from './OutputHistory.module.scss';
const pageNumbers = [1, 2, 3, 4, 5];

const OutputHistory = ({ outputs }) => {
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
    <div className={styles.output}>
      <h2 className={styles.output__title}>История выводов</h2>
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
          <th>Администратор</th>
          <th className={styles.head__items}>Предметы</th>
          <th>Время</th>
        </thead>
        <tbody className={styles.body}>
          {outputs.map((historyItem) => (
            <tr className={styles.history}>
              <td className={styles.info}>
                <div className={styles.info__container}>
                  <img className={styles.info__image} src={historyItem.avatar} alt="" />
                  <span className={styles.info__name}>{historyItem.name}</span>
                </div>
              </td>
              <td className={styles.items}>
                <ul className={styles.list}>
                  {historyItem.items.map((item) => (
                    <li className={styles.item}>
                      <img className={styles.item__image} style={{ borderColor: getItemBorderColor(item.rarity) }} src={item.image} alt="" />
                      <div className={styles.categories}>
                        <span
                          className={`${styles.categories__block} ${
                            item.pumping === 'megaNeon' ? styles.mega : ''
                          }`}></span>
                        <span
                          className={`${styles.categories__block} ${
                            item.pumping === 'neon' ? styles.neon : ''
                          }`}></span>
                        <span
                          className={`${styles.categories__block} ${
                            item.flyable ? styles.flyable : ''
                          }`}></span>
                        <span
                          className={`${styles.categories__block} ${
                            item.ridible ? styles.ridible : ''
                          }`}></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className={styles.time}>{historyItem.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputHistory;
