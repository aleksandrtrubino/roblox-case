import React from 'react';
import styles from './Dashboard.module.scss';
import popularCases from '../../data/popularCases.json';
import dashboard from '../../data/dashboard.json';
const pageNumbers = [1, 2, 3, 4, 5]

const Dashboard = () => {
  const getRarityColor = (rarityItem) => {
    switch (rarityItem) {
      case 'legendary':
        return 'rgb(255, 193, 70)';
        break;
      case 'ultraRare':
        return 'rgb(255, 60, 53)';
        break;
      case 'rare':
        return 'rgb(149, 18, 255)';
        break;
      case 'uncommon':
        return 'rgb(107, 222, 53)';
        break;
      case 'common':
        return 'rgb(0, 225, 224)';
        break;
    }
    return '';
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__statistic}>
        <div className={`${styles.block}`}>
          <span className={styles.block__title}>Пополнение за месяц</span>
          <span className={styles.block__count}>{dashboard.balanceMonthly}</span>
          <div className={styles.block__icon}>
            <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-300.000000, -2799.000000)"
                  fill="#ffffff">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M262,2656 C262,2656.552 261.552,2657 261,2657 L247,2657 C246.448,2657 246,2656.552 246,2656 L246,2646 C246,2645.448 246.448,2645 247,2645 L261,2645 C261.552,2645 262,2645.448 262,2646 L262,2656 Z M262,2641 L262,2640 C262,2639.448 261.552,2639 261,2639 C260.448,2639 260,2639.448 260,2640 L260,2641 L255,2641 L255,2640 C255,2639.448 254.552,2639 254,2639 C253.448,2639 253,2639.448 253,2640 L253,2641 L248,2641 L248,2640 C248,2639.448 247.552,2639 247,2639 C246.448,2639 246,2639.448 246,2640 L246,2641 C244.895,2641 244,2641.895 244,2643 L244,2657 C244,2658.104 244.895,2659 246,2659 L262,2659 C263.105,2659 264,2658.104 264,2657 L264,2643 C264,2641.895 263.105,2641 262,2641 L262,2641 Z"
                      id="calendar-[#1196]"></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className={`${styles.block}`}>
          <span className={styles.block__title}>Общее пополнение</span>
          <span className={styles.block__count}>{dashboard.balanceTotal}</span>
          <div className={styles.block__icon}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 3.5C13 2.94772 12.5523 2.5 12 2.5C11.4477 2.5 11 2.94772 11 3.5V4.0592C9.82995 4.19942 8.75336 4.58509 7.89614 5.1772C6.79552 5.93745 6 7.09027 6 8.5C6 9.77399 6.49167 10.9571 7.5778 11.7926C8.43438 12.4515 9.58764 12.8385 11 12.959V17.9219C10.2161 17.7963 9.54046 17.5279 9.03281 17.1772C8.32378 16.6874 8 16.0903 8 15.5C8 14.9477 7.55228 14.5 7 14.5C6.44772 14.5 6 14.9477 6 15.5C6 16.9097 6.79552 18.0626 7.89614 18.8228C8.75336 19.4149 9.82995 19.8006 11 19.9408V20.5C11 21.0523 11.4477 21.5 12 21.5C12.5523 21.5 13 21.0523 13 20.5V19.9435C14.1622 19.8101 15.2376 19.4425 16.0974 18.8585C17.2122 18.1013 18 16.9436 18 15.5C18 14.1934 17.5144 13.0022 16.4158 12.1712C15.557 11.5216 14.4039 11.1534 13 11.039V6.07813C13.7839 6.20366 14.4596 6.47214 14.9672 6.82279C15.6762 7.31255 16 7.90973 16 8.5C16 9.05228 16.4477 9.5 17 9.5C17.5523 9.5 18 9.05228 18 8.5C18 7.09027 17.2045 5.93745 16.1039 5.17721C15.2467 4.58508 14.1701 4.19941 13 4.0592V3.5ZM11 6.07814C10.2161 6.20367 9.54046 6.47215 9.03281 6.8228C8.32378 7.31255 8 7.90973 8 8.5C8 9.22601 8.25834 9.79286 8.79722 10.2074C9.24297 10.5503 9.94692 10.8384 11 10.9502V6.07814ZM13 13.047V17.9263C13.7911 17.8064 14.4682 17.5474 14.9737 17.204C15.6685 16.7321 16 16.1398 16 15.5C16 14.7232 15.7356 14.1644 15.2093 13.7663C14.7658 13.4309 14.0616 13.1537 13 13.047Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
        <div className={`${styles.block}`}>
          <span className={styles.block__title}>Игроков онлайн</span>
          <span className={styles.block__count}>{dashboard.online}</span>
          <div className={styles.block__icon}>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.8 21C15.8 21.3866 16.1134 21.7 16.5 21.7C16.8866 21.7 17.2 21.3866 17.2 21H15.8ZM4.8 21C4.8 21.3866 5.1134 21.7 5.5 21.7C5.8866 21.7 6.2 21.3866 6.2 21H4.8ZM6.2 18C6.2 17.6134 5.8866 17.3 5.5 17.3C5.1134 17.3 4.8 17.6134 4.8 18H6.2ZM12.3 21C12.3 21.3866 12.6134 21.7 13 21.7C13.3866 21.7 13.7 21.3866 13.7 21H12.3ZM13.7 18C13.7 17.6134 13.3866 17.3 13 17.3C12.6134 17.3 12.3 17.6134 12.3 18H13.7ZM11.7429 11.3125L11.3499 10.7333L11.3499 10.7333L11.7429 11.3125ZM16.2429 11.3125L15.8499 10.7333L15.8499 10.7333L16.2429 11.3125ZM3.2 21V19.5H1.8V21H3.2ZM8 14.7H11V13.3H8V14.7ZM15.8 19.5V21H17.2V19.5H15.8ZM11 14.7C13.651 14.7 15.8 16.849 15.8 19.5H17.2C17.2 16.0758 14.4242 13.3 11 13.3V14.7ZM3.2 19.5C3.2 16.849 5.34903 14.7 8 14.7V13.3C4.57583 13.3 1.8 16.0758 1.8 19.5H3.2ZM11 14.7H15.5V13.3H11V14.7ZM20.3 19.5V21H21.7V19.5H20.3ZM15.5 14.7C18.151 14.7 20.3 16.849 20.3 19.5H21.7C21.7 16.0758 18.9242 13.3 15.5 13.3V14.7ZM6.2 21V18H4.8V21H6.2ZM13.7 21V18H12.3V21H13.7ZM9.5 11.3C7.67746 11.3 6.2 9.82255 6.2 8.00001H4.8C4.8 10.5958 6.90426 12.7 9.5 12.7V11.3ZM6.2 8.00001C6.2 6.17746 7.67746 4.7 9.5 4.7V3.3C6.90426 3.3 4.8 5.40427 4.8 8.00001H6.2ZM9.5 4.7C11.3225 4.7 12.8 6.17746 12.8 8.00001H14.2C14.2 5.40427 12.0957 3.3 9.5 3.3V4.7ZM12.8 8.00001C12.8 9.13616 12.2264 10.1386 11.3499 10.7333L12.1358 11.8918C13.3801 11.0477 14.2 9.61973 14.2 8.00001H12.8ZM11.3499 10.7333C10.8225 11.091 10.1867 11.3 9.5 11.3V12.7C10.4757 12.7 11.3839 12.4019 12.1358 11.8918L11.3499 10.7333ZM14 4.7C15.8225 4.7 17.3 6.17746 17.3 8.00001H18.7C18.7 5.40427 16.5957 3.3 14 3.3V4.7ZM17.3 8.00001C17.3 9.13616 16.7264 10.1386 15.8499 10.7333L16.6358 11.8918C17.8801 11.0477 18.7 9.61973 18.7 8.00001H17.3ZM15.8499 10.7333C15.3225 11.091 14.6867 11.3 14 11.3V12.7C14.9757 12.7 15.8839 12.4019 16.6358 11.8918L15.8499 10.7333ZM11.9378 5.42349C12.5029 4.97049 13.2189 4.7 14 4.7V3.3C12.8892 3.3 11.8667 3.68622 11.0622 4.33114L11.9378 5.42349ZM14 11.3C13.3133 11.3 12.6775 11.091 12.1501 10.7333L11.3642 11.8918C12.1161 12.4019 13.0243 12.7 14 12.7V11.3Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
        <div className={`${styles.block}`}>
          <span className={styles.block__title}>Игроков оффлайн</span>
          <span className={styles.block__count}>{dashboard.offline}</span>
          <div className={styles.block__icon}>
            <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
              <g
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
                clip-path="url(#a)">
                <path d="M30 22h62L30 96h62m25-24h46l-46 55h46m-109 0h36l-36 43h36" />
              </g>

              <defs>
                <clipPath id="a">
                  <path fill="#ffffff" d="M0 0h192v192H0z" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.popular}>
        <h2 className={styles.popular__title}>Популярные кейсы</h2>
        <div className={styles.payments__control}>
          <div className={styles.pagination}>
            {pageNumbers.map((number) => (
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
        <ul className={styles.popular__list}>
          {popularCases.map((item, index) => (
            <div className={styles.list__container}>
              <li key={item.id} className={styles.popular__case}>
                <div className={styles.case__info}>
                  <span className={styles.number}>{index + 1}</span>
                  <img src={item.image} alt={item.name} />
                  <span className={styles.case__name}>{item.name}</span>
                </div>
                <div className={styles.case__items}>
                  <ul className={styles.case__list}>
                    {item.items.slice(0, 5).map((item) => (
                      <li
                        key={item.id}
                        className={styles.case__item}
                        style={{ borderColor: getRarityColor(item.rarity) }}>
                        <img src={item.image} alt={item.name} />
                      </li>
                    ))}
                    {item.items.length > 5 && <span className={styles.items__more}>+</span>}
                  </ul>
                </div>
                <div className={styles.statistic}>
                  <span className={styles.statistic__price}>{item.price} Руб.</span>
                  <span className={styles.statistic__count}>{item.count}</span>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.dropped}></div>
    </div>
  );
};

export default Dashboard;
