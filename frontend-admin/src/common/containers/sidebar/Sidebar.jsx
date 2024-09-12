import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpening = () => {
    setIsOpen(!isOpen)
  }

  const location = useLocation()
  const activeClass = (uri) =>{
    return `${styles.links_item} 
            ${location.pathname.startsWith(uri)
        ? styles.links_item_active
        : ''}`
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.logotype}>
        Petcase
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileInfo_avatar}>A</div>
        <div className={styles.profileInfo_nickname}>admin2003</div>
        <div className={styles.profileInfo_role}>Администратор</div>
      </div>
      <div className={styles.links}>
        <Link to='/pet-cards' className={activeClass("/pet-cards")}>
          <div>Карточки</div>
        </Link>
        <Link to='/pets' className={activeClass("/pets")}>
          <div>Питомцы</div>
        </Link>
        <Link to='/boxes' className={activeClass("/boxes")}>
          <div>Кейсы</div>
        </Link>
        <Link to='/users' className={activeClass("/users")}>
          <div>Пользователи</div>
        </Link>
        ----------------------
        <Link to='/cases' className={activeClass("/cases")}>
          <div>Игровые кейсы</div>
        </Link>
        <Link to='/' className={activeClass("/dashboard")}>
          <div>Дашборд</div>
        </Link>

        <Link to='/admins' className={activeClass("/admins")}>
          <div>Администраторы</div>
        </Link>
        <Link to='/promocodes' className={activeClass("/promocodes")}>
          <div>Промокоды</div>
        </Link>
        <Link to='/payments' className={activeClass("/payments")}>
          <div>Транзакции</div>
        </Link>
        <Link to='/outputtings' className={activeClass("/outputtings")}>
          <div>Вывод предметов</div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;

