import React from 'react';
import { Link } from 'react-router-dom';
import admin from '../../data/admin.json';
import styles from './Admin.module.scss';
import Deal from './modules/Deal/Deal';
const pageNumbers = [1, 2, 3, 4, 5];

const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedTrade, setSelectedTrade] = React.useState(null);

  const handleDealWindow = (deal) => {
    setSelectedTrade(deal)
    setOpen(!open)
  }

  const getStatusDeal = (status) => {
    if(status === 'agreed') {
      return 'Подтверждено'
    } else if(status === 'cancel') {
      return 'Отменено'
    }
    return ''
  }

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

  const getAdminRole = (role) => {
    if (role === 'admin') {
      return 'Администратор';
    }

    return '';
  };

  return (
    <div className={styles.admin}>
      <div className={styles.admin__user}>
        <div className={styles.user__container}>
          <img className={styles.admin__image} src={admin.avatar} alt={admin.nickname} />
          <div className={styles.admin__info}>
            <span className={styles.admin__name}>{admin.nickname}</span>
            <span className={styles.admin__role}>{getAdminRole(admin.role)}</span>
          </div>
        </div>
        <div className={styles.user__statistic}>
          <div className={styles.deals}>
            <span className={styles.deals__title}>Подтвердил сделок</span>
            <span className={styles.deals__count}>1001</span>
          </div>
          <div className={styles.deals}>
            <span className={styles.deals__title}>Отменил сделок</span>
            <span className={styles.deals__count}>54</span>
          </div>
          <div className={styles.deals}>
            <span className={styles.deals__title}>Забанил игроков</span>
            <span className={styles.deals__count}>27</span>
          </div>
        </div>
        <div className={styles.user__control}>
          <button className={styles.control__button}>
            Удалить администратора
          </button>
        </div>
      </div>
      <div className={styles.history}>
        <h2 className={styles.history__title}>История выводов</h2>
        <div className={styles.items__control}>
          <div className={styles.pagination}>
            {pageNumbers.map((number) => (
              <button className={styles.page__button}>{number}</button>
            ))}
          </div>
          <div className={styles.control__manage}>
            <input className={styles.control__search} type="text" placeholder="Поиск" />
          </div>
        </div>
        <ul className={styles.history__list}>
          {admin.outputtings.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.item__container}>
                <div className={styles.item__info}>
                  <img className={styles.item__image} src={item.avatar} alt={item.username} />
                  <span className={styles.item__name}>{item.username}</span>
                  <span className={styles.item__identificator}>{item.identificator}</span>
                </div>
                <ul className={styles.items}>
                  {item.items.slice(0, 5).map((item) => (
                    <li key={item.id} className={styles.thing}>
                      <img
                        style={{ borderColor: getItemBorderColor(item.rarity) }}
                        className={styles.thing__image}
                        src={item.image}
                        alt={item.name}
                      />
                    </li>
                  ))}
                  {item.items.length > 5 && <div className={styles.thing__more}>+</div>}
                </ul>
                <span className={styles.item__timestamp}>{item.timestamp}</span>
                <span className={`${styles.item__status} ${item.status === 'agreed' ? styles.agreed : ''} ${item.status === 'cancel' ? styles.cancel : ''}`}>{getStatusDeal(item.status)}</span>
              </div>
              <button onClick={() => handleDealWindow(item)} className={styles.item__button}>Подробнее</button>
            </li>
          ))}
        </ul>
      </div>
      {open && selectedTrade && <Deal selectedDeal={selectedTrade} closeWindow={handleDealWindow} />}
    </div>
  );
};

export default Admin;
