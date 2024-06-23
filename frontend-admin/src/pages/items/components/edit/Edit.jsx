import React from 'react';
import styles from './Edit.module.scss';

const Edit = ({ closeWindow, item }) => {
  return (
    <div className={styles.adding}>
      <div className={styles.adding__container}>
        <h2 className={styles.adding__title}>Редактирование предмета</h2>
        <button onClick={closeWindow} className={styles.close}>
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#000000"
              d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
            />
          </svg>
        </button>
        <div className={styles.edit}>
          <div className={styles.edit__image}>
            <img src={item.image} alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__block}>
              <span>Название предмета</span>
              <input type="text" value={item.name} />
            </div>
            <div className={styles.info__block}>
              <span>Стоимость предмета</span>
              <input type="text" value={item.price} />
            </div>
            <div className={styles.info__select}>
              <span>Выбери редкость</span>
              <select value={item.rarity}>
                <option value="legendary">Legendary</option>
                <option value="ultraRare">Ultra-Rare</option>
                <option value="rare">Rare</option>
                <option value="uncommon">Uncommon</option>
                <option value="common">Common</option>
              </select>
            </div>
            <div className={styles.info__select}>
              <span>Выбери возраст</span>
              <select value={item.age}>
                <option value="newBorn">New Born</option>
                <option value="Junior">Junior</option>
                <option value="Pre-Teen">Pre-Teen</option>
                <option value="Teen">Teen</option>
                <option value="Post-Teen">Post-Teen</option>
                <option value="Full-Grown">Full-Grown</option>
              </select>
            </div>
            <div className={styles.properties}>
              <span className={styles.properties__title}>Выбери категории</span>
              <div className={styles.properties__container}>
                <div className={styles.properties__row}>
                  <div className={styles.properties__select}>
                    <input type="checkbox" defaultChecked={item.pumping === 'megaNeon' ? 'checked' : ''}/>
                    <span className={`${styles.mega__neon} ${styles.properties__icon}`}>M</span>
                  </div>
                  <div className={styles.properties__select}>
                    <input type="checkbox" defaultChecked={item.pumping === 'neon' ? 'checked' : ''}/>
                    <span className={`${styles.neon} ${styles.properties__icon}`}>N</span>
                  </div>
                </div>
                <div className={styles.properties__row}>
                  <div className={styles.properties__select}>
                    <input type="checkbox" defaultChecked={item.flyable ? 'checked' : ''}/>
                    <span className={`${styles.flyable} ${styles.properties__icon}`}>F</span>
                  </div>
                  <div className={styles.properties__select}>
                    <input type="checkbox" defaultChecked={item.ridible ? 'checked' : ''}/>
                    <span className={`${styles.ridible} ${styles.properties__icon}`}>R</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.adding__buttons}>
          <button className={styles.adding__pending}>Отложить</button>
          <button className={styles.adding__agree}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
