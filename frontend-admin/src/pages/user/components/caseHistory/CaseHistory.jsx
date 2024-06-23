import React from 'react';

import styles from './CaseHistory.module.scss';
const pageNumbers = [1, 2, 3, 4, 5]

const CaseHistory = ({ history }) => {
  return (
    <div className={styles.history}>
      <h2 className={styles.title}>Выпавшие предметы</h2>
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
        <thead className={styles.header}>
          <tr>
            <th className={styles.table__header}>Кейс</th>
            <th className={styles.table__header}>Предмет</th>
            <th className={styles.table__header}>Категории</th>
            <th className={styles.table__header}>Возраст</th>
            <th className={styles.table__header}>Цена</th>
            <th className={styles.table__header}>Время</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {history.map((item) => (
            <tr key={item.id}>
              <td className={`${styles.table__item}`}>
                <div className={`${styles.case}`}>
                  <div className={styles.image__container}>
                    <img className={styles.case__image} src={item.caseImage} alt="" />
                  </div>
                  <p>{item.caseName}</p>
                </div>
              </td>
              <td className={`${styles.table__item}`}>
                <div className={`${styles.item}`}>
                  <div
                    className={`${styles.item__rarity} ${
                      item.rarity === 'legendary' ? styles.legendary : ''
                    } ${item.rarity === 'ultraRare' ? styles.ultraRare : ''} ${
                      item.rarity === 'rare' ? styles.rare : ''
                    } ${item.rarity === 'uncommon' ? styles.uncommon : ''} ${
                      item.rarity === 'common' ? styles.common : ''
                    }`}>
                    <img className={styles.item__image} src={item.image} alt={item.name} />
                  </div>
                  <p>{item.name}</p>
                </div>
              </td>
              <td className={`${styles.table__item}`}>
                <div className={`${styles.properties}`}>
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
              <td className={styles.table__item}>{item.age}</td>
              <td className={styles.table__item}>{item.price}</td>
              <td className={`${styles.table__item} ${styles.time}`}>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseHistory;
