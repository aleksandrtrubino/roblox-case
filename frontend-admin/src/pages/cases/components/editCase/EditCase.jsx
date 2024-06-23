import React from 'react';
import styles from './EditCase.module.scss';
import items from '../../../../data/items.json';

const EditCase = ({ closeEdit, caseItem }) => {
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
    <div className={styles.add}>
      <div className={styles.add__container}>
        <button onClick={closeEdit} className={styles.button__close}>
          ✕
        </button>
        <div className={styles.case}>
          <h2 className={styles.case__title}>Редактирование кейса</h2>
          <div className={styles.case__container}>
            <div className={styles.case__edit}>
              <div className={styles.case__info}>
                <div className={styles.case__image}>
                  <img src={caseItem.image} alt="" />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info__block}>
                  <span>Название кейса</span>
                  <input className={styles.info__input} type="text" value={caseItem.name} />
                </div>
                <div className={styles.info__block}>
                  <span>Стоимость прокрутки</span>
                  <input className={styles.info__input} type="text" value={caseItem.price} />
                </div>
                <div className={styles.info__block}>
                  <span>Ограниченное количество</span>
                  <input className={styles.info__input} type="text" />
                </div>
              </div>
            </div>
            <div className={styles.case__items}>
              <ul className={styles.items__list}>
                {items.map((item) => (
                  <li className={styles.item}>
                    <div className={styles.item__container}>
                      <input className={styles.item__checkbox} type="checkbox" />
                      <img
                        className={styles.item__image}
                        style={{ borderColor: getItemBorderColor(item.rarity) }}
                        src={item.image}
                        alt={item.name}
                      />
                      <div className={styles.item__info}>
                        <span className={styles.item__name}>{item.name}</span>
                        <span className={styles.item__age}>{item.age}</span>
                        <div className={`${styles.properties}`}>
                          <span
                            className={`${
                              item.pumping === 'megaNeon' ? `${styles.mega__neon}` : ''
                            } ${styles.properties__icon}`}>
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
                      </div>
                    </div>
                    <span className={styles.chance}>
                      <input type="number" step={5} min={0} max={100} /> %
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.add__buttons}>
          <button className={`${styles.add__button} ${styles.button__pending}`}>Оставить</button>
          <button className={`${styles.add__button} ${styles.button__add}`}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default EditCase;
