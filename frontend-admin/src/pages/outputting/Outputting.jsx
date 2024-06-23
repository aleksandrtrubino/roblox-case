import React from 'react';
import styles from './Outputting.module.scss';
import items from '../../data/outputting.json';
import { Link } from 'react-router-dom';
import Modal from './modules/Modal/Modal';
const pageNumbers = [1, 2, 3, 4, 5]

const Outputting = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleModal = (user) => {
    setSelectedUser(user);
    setOpenModal(!openModal);
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
    <div className={styles.outputtings}>
      <h2 className={styles.outputting__title}>Вывод предметов</h2>
      <div className={styles.payments__control}>
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
        {items.map((item) => (
          <li className={styles.outputting}>
            <div className={styles.user}>
              <img className={styles.user__image} src={item.user.avatar} alt="" />
              <span className={styles.user__username}>{item.user.username}</span>
              <span className={styles.user__nickname}>{item.user.nickname}</span>
            </div>
            <ul className={styles.items__list}>
              {item.items.slice(0, 5).map((item, index) => (
                <li
                  key={item.id}
                  className={styles.item}
                  style={{ borderColor: getItemBorderColor(item.rarity) }}>
                  <img className={styles.item__image} src={item.image} alt="" />
                </li>
              ))}
              {item.items.length > 5 && <li className={styles.plus}>&#65291;</li>}
            </ul>
            <div className={styles.control}>
              <div className={styles.control__pending}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title />

                  <g id="Complete">
                    <g id="Clock">
                      <g>
                        <polyline
                          fill="none"
                          points="11.9 5.9 11.9 11.9 12 12 14.1 14.1"
                          stroke="rgba(255, 166, 0, 0.996)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          data-name="Circle"
                          fill="none"
                          id="Circle-2"
                          r="10"
                          stroke="rgba(255, 166, 0, 0.996)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                Ожидает
              </div>
              <button className={styles.button} onClick={() => handleModal(item)}>
                Подробнее
              </button>
            </div>
          </li>
        ))}
      </ul>
      {openModal && selectedUser && <Modal user={selectedUser} closeModal={handleModal} />}
    </div>
  );
};

export default Outputting;
