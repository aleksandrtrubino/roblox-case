import React from 'react';
import styles from './Deal.module.scss';

const Deal = ({ closeWindow, selectedDeal }) => {
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
  const getStatusDeal = (status) => {
    if (status === 'agreed') {
      return 'Подтверждено';
    } else if (status === 'cancel') {
      return 'Отменено';
    }
    return '';
  };
  return (
    <div className={styles.deal}>
      <div className={styles.deal__container}>
        <button onClick={closeWindow} className={styles.button__close}>
          ✕
        </button>
        <div className={styles.deal__user}>
          <div className={styles.user__column}>
            <img
              className={styles.user__image}
              src={selectedDeal.avatar}
              alt={selectedDeal.username}
            />
          </div>
          <div className={styles.user__column}>
            <span className={styles.user__username}>{selectedDeal.username}</span>
            <span className={styles.user__indeficator}>{selectedDeal.identificator}</span>
            <span className={styles.user__timestamp}>{selectedDeal.timestamp}</span>
            <span
              className={`${styles.item__status} ${
                selectedDeal.status === 'agreed' ? styles.agreed : ''
              } ${selectedDeal.status === 'cancel' ? styles.cancel : ''}`}>
              {getStatusDeal(selectedDeal.status)}
            </span>
          </div>
        </div>
        <ul className={styles.list}>
          <h2 className={styles.list__title}>Список предметов</h2>
          {selectedDeal.items.map((item) => (
            <li className={styles.item}>
              <div className={styles.item__info}>
              <img
                className={styles.item__image}
                style={{ borderColor: getItemBorderColor(item.rarity) }}
                src={item.image}
                alt=""
              />
              <span>{item.name}</span>
              </div>
              <div className={styles.item__age}><span>{item.age}</span></div>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Deal;
