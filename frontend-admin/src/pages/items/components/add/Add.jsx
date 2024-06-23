import React from 'react';
import styles from './Add.module.scss';

const Add = ({ close }) => {
  return (
    <div className={styles.adding}>
      <div className={styles.adding__container}>
        <h2 className={styles.adding__title}>Добавление предмета</h2>
        <button onClick={close} className={styles.close}>
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#000000"
              d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
            />
          </svg>
        </button>
        <div className={styles.edit}>
          <div className={styles.edit__image}>
            <span className={styles.edit__adding}>
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64">
                <g>
                  <path
                    fill="#231F20"
                    d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z
		 M8,8h48v32.688l-9.113-9.113c-1.562-1.559-4.094-1.559-5.656,0L16.805,56H8V8z"
                  />
                  <circle fill="#231F20" cx="24" cy="24" r="8" />
                </g>
              </svg>
            </span>
          </div>
          <div className={styles.info}>
            <div className={styles.info__block}>
              <span>Название предмета</span>
              <input type="text" />
            </div>
            <div className={styles.info__block}>
              <span>Стоимость предмета</span>
              <input type="text" />
            </div>
            <div className={styles.info__select}>
              <span>Выбери редкость</span>
              <select value="Редкость">
                <option value="legendary">Legendary</option>
                <option value="ultraRare">Ultra-Rare</option>
                <option value="rare">Rare</option>
                <option value="uncommon">Uncommon</option>
                <option value="common">Common</option>
              </select>
            </div>
            <div className={styles.info__select}>
              <span>Выбери возраст</span>
              <select value="Возраст">
                <option value="newBorn">New Born</option>
                <option value="junior">Junior</option>
                <option value="preTeen">Pre-Teen</option>
                <option value="teen">Teen</option>
                <option value="postTeen">Post-Teen</option>
                <option value="fullGrown">Full-Grown</option>
              </select>
            </div>
            <div className={styles.properties}>
              <span className={styles.properties__title}>Выбери категории</span>
              <div className={styles.properties__container}>
                <div className={styles.properties__row}>
                  <div className={styles.properties__select}>
                    <input type="checkbox" />
                    <span className={`${styles.mega__neon} ${styles.properties__icon}`}>M</span>
                  </div>
                  <div className={styles.properties__select}>
                    <input type="checkbox" />
                    <span className={`${styles.neon} ${styles.properties__icon}`}>N</span>
                  </div>
                </div>
                <div className={styles.properties__row}>
                  <div className={styles.properties__select}>
                    <input type="checkbox" />
                    <span className={`${styles.flyable} ${styles.properties__icon}`}>F</span>
                  </div>
                  <div className={styles.properties__select}>
                    <input type="checkbox" />
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

export default Add;
