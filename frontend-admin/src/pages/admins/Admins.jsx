import React from 'react';
import styles from './Admins.module.scss';
import { Link } from 'react-router-dom';
import admins from '../../data/admins.json';

const Admins = () => {
  const getItemBorderColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700';
      case 'ultraRare':
        return '#800080';
      case 'rare':
        return '#4169E1';
      case 'uncommon':
        return '#008000';
      case 'common':
        return '#808080';
      default:
        return '#000000';
    }
  };

  return (
    <div className={styles.admins__page}>
      <div className={styles.admins}>
        <h2 className={styles.admins__title}> Список администраторов</h2>
        <ul className={styles.admin__list}>
          {admins.admins.map((admin) => (
            <li className={styles.admin} key={admin.id}>
              <div className={styles.admin__info}>
                <img className={styles.admin__image} src={admin.avatar} alt={admin.nickname} />
                <span className={styles.admin__name}>{admin.nickname}</span>
                <span className={styles.admin__role}>
                  {admin.role === 'admin' ? 'Администратор' : ''}
                </span>
              </div>
              <div className={styles.buttons}>
                <button className={styles.admin__delete}>Удалить</button>
                <Link to={`/admin/${admin.id}`}>
                  <button className={styles.admin__button}>Профиль</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admins;
