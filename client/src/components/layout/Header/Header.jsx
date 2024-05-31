import { Link } from 'react-router-dom';
import { Logotype } from '../../common/Logotype/Logotype';
import { Balance } from './components/Balance/Balance';
import { NotificationIcon } from './components/NotificationIcon/NotificationIcon';
import { Profile } from './components/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';

//? Временно неиспользуемые компоненты 
//? import { Online } from './components/Online/Online';

import styles from './header.module.scss';

let balanceCount = 101;

export const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.header_start}>
          <Logotype />

        {/* Добавление счетчика пользователей на сайте */}
        {/* <Online className={styles.header_online}/> */}
      </div>

          <div className={styles.header_right}>
            <NotificationIcon />
            <Balance balanceCount={balanceCount}/>
            <Profile />
          </div>
          {/* <button className={styles.auth} >
            Войти
          </button> */}
    </div>
  );
};
