import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';

import styles from './Sidebar.module.scss';
import {useSelector} from "react-redux";
import {selectUserRole} from "../../../model/authSlice";
import {useGetUserMeQuery} from "../../../api/userApi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpening = () => {
    setIsOpen(!isOpen)
  }


  const user = useGetUserMeQuery();

  const location = useLocation()
  const activeClass = (uri) =>{
    return `${styles.links_item} 
            ${location.pathname.startsWith(uri)
        ? styles.links_item_active
        : ''}`
  }

  const roleNameById = (id) =>{
    if(id === 1)
      return 'Администратор';
    return 'Модератор'
  }

  return (
      user.isSuccess ?
          <div className={styles.sidebar}>
            <div className={styles.logotype}>
              Petcase
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileInfo_avatar}>{user.data.nickname[0].toUpperCase()}</div>
              <div className={styles.profileInfo_nickname}>{user.data.nickname}</div>
              <div className={styles.profileInfo_role}>{roleNameById(user.data.authorities[0].id)}</div>
            </div>
            <div className={styles.links}>
              <Link to='/boxes' className={activeClass("/boxes")}>
                <div>Кейсы</div>
              </Link>
              <Link to='/pets' className={activeClass("/pets")}>
                <div>Питомцы</div>
              </Link>
              <Link to='/pet-cards' className={activeClass("/pet-cards")}>
                <div>Карточки</div>
              </Link>
              <Link to='/users' className={activeClass("/users")}>
                <div>Пользователи</div>
              </Link>
              {
                user.data.authorities[0].id === 1 ?
                    <Link to='/moderators' className={activeClass('/moderators')}>
                      <div>Модераторы</div>
                    </Link>
                    :
                    ''
              }
              <Link to='/promocodes' className={activeClass("/promocodes")}>
                <div>Промокоды</div>
              </Link>
            </div>
          </div>
          :
          user.isLoading ?
              'loading...'
              :
              user.isError ?
                  'error'
                  :
                  'shit'
  );
};
export default Sidebar;

