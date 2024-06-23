import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Users.module.scss';
import usersData from '../../data/users.json';
const pageNumbers = [1, 2, 3, 4, 5]

let userSelected = 10
let usersCount = usersData.length;
let usersBanned = usersData.filter(user => user.status === 'banned')
let usersActive = usersData.filter(user => user.status === 'active')
let usersOffline = usersData.filter(user => user.status === 'offline')

const Users = () => {
  return (
    <div className={styles.users}>
      <h1 className={styles.title}>Пользователи</h1>
      <div className={styles.control}>
        <p>Всего пользователей: {usersCount}</p>
        <div className={styles.control__variations}>
          <p className={`${styles.variation} ${styles.variation__active}`}>В сети: {usersActive.length}</p>
          <p className={`${styles.variation} ${styles.variation__offline}`}>Не активны: {usersOffline.length}</p>
          <p className={`${styles.variation} ${styles.variation__banned}`}>Забаненных: {usersBanned.length}</p>
        </div>
      </div>
      <div className={styles.panel}>
        <p>Выбрано {userSelected} пользователей</p>
        <div className={styles.panel__buttons}>
          <button className={styles.button__cancel}>Отмена</button>
          <button className={styles.button__ban}>Забанить</button>
          <button className={styles.button__delete}>Удалить</button>
        </div>
      </div>
      <div className={styles.users__control}>
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
      <ul className={styles.list}>
        {usersData.map((user) => (
          <li className={styles.profile__user} key={user.id}>
            <div className={styles.profile__container}>
              <img className={styles.profile__image} src={user.avatar} alt={user.nickname} />
              <p className={styles.profile__name}>{user.nickname}</p>
              <p
                className={`
              ${styles.profile__status} 
              ${user.status === 'banned' ? styles.banned : ''} 
              ${user.status === 'active' ? styles.active : ''} 
              ${user.status === 'offline' ? styles.offline : ''}
              `}>
                {user.status}
              </p>
            </div>
            <div className={styles.profile__buttons}>
              <button className={styles.button__del}>Забанить</button>
              <Link to={`/user/${user.id}`}>
                <button className={styles.link__button}>Профиль</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
