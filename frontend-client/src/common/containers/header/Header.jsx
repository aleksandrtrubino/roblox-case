import { Link } from 'react-router-dom';
import { Logotype } from '../../components/logotype/Logotype';
import { Balance } from './components/balance/Balance';
import { NotificationIcon } from './components/notification-icon/NotificationIcon';
import { ProfileIcon } from './components/profile/ProfileIcon';
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
            <Balance balanceCount={balanceCount}/>
            <ProfileIcon />
              <NotificationIcon />
          </div>
          {/* <button className={styles.auth} >
            Войти
          </button> */}
    </div>
  );
};
