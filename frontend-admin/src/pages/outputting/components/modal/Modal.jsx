import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Modal.module.scss';

const Modal = ({ closeModal, user }) => {
  const handleCopyNickname = () => {
    navigator.clipboard.writeText(user.user.nickname);
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
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <button onClick={closeModal} className={styles.close}>
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#000000"
              d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
            />
          </svg>
        </button>
        <div className={styles.user}>
          <div className={styles.user__profile}>
            <Link to={`/user/${user.user.id}`}>
              <img className={styles.user__image} src={user.user.avatar} alt={user.user.username} />
            </Link>
            <div className={styles.user__info}>
              <span className={styles.username}>{user.user.username}</span>
              <span className={styles.nickname}>
                {user.user.nickname}
                <button onClick={handleCopyNickname} className={styles.copy}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z"
                      stroke="#464455"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </span>
              <div className={styles.user__control}>
                <button className={`${styles.user__button} ${styles.user__accept}`}>Принять</button>
                <button className={`${styles.user__button} ${styles.user__cancel}`}>Отмена</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <h2 className={styles.items__title}>Предметы на вывод</h2>
          <ul className={styles.items__list}>
            {user.items.map((item) => (
              <li className={styles.item}>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
