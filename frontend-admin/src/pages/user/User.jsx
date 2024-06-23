import React from 'react';
import styles from './User.module.scss';
import userProfile from '../../data/user.json';
import Transactions from './components/transactions/Transactions';
import CaseHistory from './components/caseHistory/CaseHistory';
import Inventory from './components/inventory/Inventory';
import OutputHistory from './components/outputHistory/OutputHistory';

const User = () => {
  const {
    avatar,
    nickname,
    gameNickname,
    inventory,
    status,
    email,
    registrationDate,
    lastVisit,
    banDate,
    balance,
    outputHistory,
    replenish,
    transactions,
    caseHistory,
  } = userProfile;

  const getBanned = () => {
    if (status === 'banned') {
      return 'Разбанить';
    } else {
      return 'Забанить';
    }
    return '';
  };

  const getTooltipText = () => {
    if (status === 'active') {
      return 'Активен';
    } else if (status === 'offline') {
      return `${formatDate(lastVisit)}`;
    } else if (status === 'banned') {
      return `${formatDate(banDate)}`;
    }

    return '';
  };

  const getTextUnderAvatar = () => {
    if (status === 'active') {
      return 'В сети';
    } else if (status === 'offline') {
      return 'Не активен';
    } else if (status === 'banned') {
      return 'Забанен';
    }

    return '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className={styles.user}>
      <div className={styles.profile}>
        <div className={styles.profile__main}>
          <div className={styles.profile__avatar}>
            <img className={styles.avatar} src={avatar} alt="" />
            <div className={styles.profile__status}>
              <span
                className={`${styles.status} ${status === 'banned' ? styles.banned : ''} ${
                  status === 'active' ? styles.active : ''
                } ${status === 'offline' ? styles.offline : ''}`}
                title={getTooltipText()}>
                {getTextUnderAvatar()}
              </span>
            </div>
          </div>
          <div className={styles.profile__container}>
            <div className={styles.profile__info}>
              <p className={styles.nickname}>{nickname}</p>
            </div>
            <a
              className={`${styles.mail} ${status === 'banned' ? styles.banned : ''} ${
                status === 'active' ? styles.active : ''
              } ${status === 'offline' ? styles.offline : ''}`}
              href="mailto:email">
              {email}
            </a>
            {/* <p className={styles.game__nickname}>{gameNickname}</p> */}
            <p className={styles.registration} title="Дата регистрации">
              Зарегистрирован:
              <span>{formatDate(registrationDate)}</span>
            </p>
          </div>
        </div>
        <div className={styles.profile__control}>
          <div className={styles.statistic}>
            <div className={styles.replenish}>
              Общее пополнение <span className={styles.replenish__num}>{replenish}</span>
            </div>
            <div className={styles.output}>
              Общий вывод
              <span className={styles.output__num}>300</span>
            </div>
            <div className={styles.balance}>
              Баланс
              <span className={styles.balance__num}>{balance}</span>
            </div>
          </div>
          <div className={styles.control}>
            <button className={`${styles.control__button} ${styles.profile__ban}`}>
              {getBanned()}
            </button>
            <button className={`${styles.control__button} ${styles.profile__delete}`}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      <Inventory inventory={inventory}/>
      <CaseHistory history={caseHistory} />
      <OutputHistory outputs={outputHistory}/>
      <Transactions transactions={transactions} />
    </div>
  );
};

export default User;
