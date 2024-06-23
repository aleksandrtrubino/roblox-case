import React from 'react';
import cases from '../../data/cases.json';
import styles from './Cases.module.scss';

import AddCase from './components/addCase/AddCase';
import EditCase from './components/editCase/EditCase';
const pageNumbers = [1, 2, 3, 4, 5]

const Cases = () => {

  const [openAdd, setOpenAdd] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [selectedCase, setSelectedCase] = React.useState(null)

  const handleOpenEdit = (caseItem) => {
    setSelectedCase(caseItem)
    setOpenEdit(!openEdit)
  }

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd)
  }
  
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
    <div className={styles.cases}>
      <div className={styles.cases__container}>
        <h2 className={styles.cases__title}>Список кейсов</h2>
        <button className={styles.cases__add} onClick={handleOpenAdd}>Добавить</button>
      </div>
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
      <ul className={styles.cases__list}>
        {cases.map((caseItem) => (
          <li className={styles.case}>
            <div className={styles.case__info}>
              <img className={styles.case__image} src={caseItem.image} alt={caseItem.name} />
              <span className={styles.case__name}>{caseItem.name}</span>
            </div>
            <ul className={styles.items__list}>
              {caseItem.items.slice(0, 5).map((item) => (
                <li
                  className={styles.item}
                  style={{ borderColor: getItemBorderColor(item.rarity) }}
                  >
                  <img className={styles.item__image} src={item.image} alt={item.name} />
                </li>
              ))}
              {caseItem.items.length > 5 && <div className={styles.items__more}>+</div>}
            </ul>
            <div>
              <span className={styles.case__price}>{caseItem.price} Руб.</span>
              <button onClick={() => handleOpenEdit(caseItem)} className={styles.edit__button}>Редактировать</button>
            </div>
          </li>
        ))}
      </ul>
      {openAdd && (<AddCase closeAdd={handleOpenAdd} />)}
      {openEdit && selectedCase && (<EditCase caseItem={selectedCase} closeEdit={handleOpenEdit} />)}
    </div>
  );
};

export default Cases;
