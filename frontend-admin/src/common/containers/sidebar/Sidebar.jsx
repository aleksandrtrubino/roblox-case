import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpening = () => {
    setIsOpen(!isOpen)
  }

  const location = useLocation()

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__head}>
          <div className={styles.logotype}>Petcase</div>
        </div>
        <div className={styles.category}>
          <h1 className={styles.category__name}>Основные</h1>
          <ul className={styles.category__list}>
            <li className={styles.category__item}>
              <NavLink to='/' className={`${styles.category__link} ${location.pathname === '/' ? styles.active : ''}`}>
                <img src="" alt="" />
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <h1 className={styles.category__name}>Список</h1>
          <ul className={styles.category__list}>
            <li className={styles.category__item}>
              <NavLink to='/users' className={`${styles.category__link} ${location.pathname === '/users' ? styles.active : ''}`}>
                <img src="" alt="" />
                Пользователи
              </NavLink>
            </li>
            <li className={styles.category__item}>
              <NavLink to='/admins' className={`${styles.category__link} ${location.pathname === '/admins' ? styles.active : ''}`}>
                Администраторы
              </NavLink>
            </li>
            <li className={styles.category__item}>
              <NavLink to='/items' className={`${styles.category__link} ${location.pathname === '/items' ? styles.active : ''}`}>
                <img src="" alt="" />
                Предметы
              </NavLink>
            </li>
            <li className={styles.category__item}>
              <NavLink to='/cases' className={`${styles.category__link} ${location.pathname === '/cases' ? styles.active : ''}`}>
                <img src="" alt="" />
                Игровые кейсы
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <h1 className={styles.category__name}>Управление</h1>
          <ul className={styles.category__list}>
            <li className={styles.category__item}>
              <NavLink to='/promocodes' className={`${styles.category__link} ${location.pathname === '/promocodes' ? styles.active : ''}`}>
                <img src="" alt="" />
                Промокоды
              </NavLink>
              <NavLink to='/payments' className={`${styles.category__link} ${location.pathname === '/payments' ? styles.active : ''}`}>
                <img src="" alt="" />
                Транкзации
              </NavLink>
            </li>
            <li className={styles.category__item}>
              <NavLink to='/outputtings' className={`${styles.category__link} ${location.pathname === '/outputtings' ? styles.active : ''}`}>
                <img src="" alt="" />
                Вывод предметов
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
