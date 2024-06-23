import React from 'react';

import styles from './Items.module.scss';
import items from '../../data/items.json';
import Add from './modules/Add/Add';
import Edit from './modules/Edit/Edit'
const pageNumbers = [1, 2, 3, 4, 5, 6, 7];

const Items = () => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)

  const handleOpenEdit = (item) => {
    setSelectedItem(item)
    setOpenEdit(!openEdit)
  }

  const handleOpenAdd = (item) => {
    setOpenAdd(!openAdd);
  };

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
    <div className={styles.items}>
      <div className={styles.edit}>
        <h2 className={styles.edit__title}>Редактор предметов</h2>
        <button onClick={handleOpenAdd} className={styles.edit__button}>
          Добавить предмет
        </button>
      </div>
      <div className={styles.items__control}>
        <div className={styles.pagination}>
          {pageNumbers.map((number) => (
            <button className={styles.page__button}>{number}</button>
          ))}
        </div>
        <div className={styles.control__manage}>
          <input className={styles.control__search} type="text" placeholder="Поиск" />
          <select className={styles.control__sorting} value="Сортировка">
            <option className={styles.sorting__set} value="time_desc">
              По возрасту (убывание)
            </option>
            <option className={styles.sorting__set} value="time_asc">
              По возрасту (возрастание)
            </option>
            <option className={styles.sorting__set} value="amount_desc">
              По сумме (убывание)
            </option>
            <option className={styles.sorting__set} value="amount_asc">
              По сумме (возрастание)
            </option>
            <option className={styles.sorting__set} value="payment_method">
              По категориям (убывание)
            </option>
            <option className={styles.sorting__set} value="payment_method">
              По категориям (возрастание)
            </option>
          </select>
        </div>
      </div>
      <div className={styles.list}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <th className={styles.head__title}>Предмет</th>
            <th className={styles.head__title}>Возраст</th>
            <th className={styles.head__title}>Категории</th>
            <th className={styles.head__title}>Стоимость</th>
            <th className={styles.head__title}></th>
          </thead>
          <tbody className={styles.body}>
            {items.map((item) => (
              <tr key={item.id} className={styles.body__item}>
                <td>
                  <div className={styles.item}>
                    <div className={styles.image__container}>
                      <img
                        className={styles.image}
                        style={{ borderColor: getItemBorderColor(item.rarity) }}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <p className={styles.item__title}>{item.name}</p>
                  </div>
                </td>
                <td>
                  <p className={styles.age}>{item.age}</p>
                </td>
                <td>
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
                <td>
                  <p>{item.price} Руб.</p>
                </td>
                <td className={styles.table__button}>
                  <button onClick={() => handleOpenEdit(item)} className={styles.button__edit}>Редактировать</button>
                  <button className={styles.button__delete}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openAdd && <Add close={handleOpenAdd}/>}
      {openEdit && selectedItem && <Edit item={selectedItem} closeWindow={handleOpenEdit}/>}
    </div>
  );
};

export default Items;
