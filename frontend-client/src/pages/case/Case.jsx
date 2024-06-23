import React, { useEffect } from 'react';

import { Backward } from '../../common/components/backward/Backward';
import { Item } from '../../common/components/item/Item';
import { Sound } from '../../common/components/sound/Sound';
import styles from './case.module.scss';
import { ClosedIcon } from '../../common/components/closedIcon/ClosedIcon';
import axios from 'axios';
import { Roulette } from './components/roulette/Roulette';

let caseCount = 26;
let sellCount = 14;

export const Case = () => {
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);
  const [isRouletteVisible, setIsRouletteVisible] = React.useState(false);


  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });


  return (
    <div className={styles.case}>
      <div className={styles.case_wrapper}>
        <div className={`${styles.case_header} ${styles.header}`}>
          <div className={styles.header_left}>
            <Backward />
            <span className={styles.case_title}></span>
          </div>
          <div className={styles.header_right}>
            <Sound />
          </div>
        </div>
        <div className={`${styles.case_body} ${styles.body}`}>
          <div className={`${styles.case_open} ${styles.open}`}>
            <div className={styles.open_wrapper}>
              {/* Изображение кейса */}
                <div className={`${styles.open_info} ${styles.info}`}>
                  
                </div>

              {/* Сама рулетка */}
                <div className={styles.open_roulette}>
                  <Roulette></Roulette>
                </div>

              {/* Отдельное окно с выпавшим предметом */}
              {/* <div className={`${styles.open_win} ${styles.win}`}>
                <div className={styles.win_wrapper}>
                  <Item />
                </div>
              </div> */}
            </div>

            {/* Кнопка с авторизацией */}
            {/* <div className={`${styles.open_auth} ${styles.auth}`}>
              <button className={styles.auth_button}>
                Авторизироваться
              </button>
            </div> */}

            {/* Управление кейсом */}
            {isPageLoaded && (
              <div className={`${styles.open_controls} ${styles.controls}`}>
                <div className={`${styles.controls_container} ${styles.count}`}>
                  <div className={styles.count_wrapper}>
                    <ClosedIcon />
                    <button className={styles.count_button}>1</button>
                    <button className={styles.count_button}>2</button>
                    <button className={styles.count_button}>3</button>
                    <button className={styles.count_button}>4</button>
                    <button className={styles.count_button}>5</button>
                    <button className={styles.count_button}>10</button>
                  </div>
                </div>
                <div className={`${styles.control_container} ${styles.slow}`}>
                  <button  className={`${styles.slow_button}`}>
                    Открыть кейс за {caseCount} M
                  </button>
                </div>
                <div className={`${styles.control_container} ${styles.fast}`}>
                  <ClosedIcon />
                  <button className={styles.fast_button}>Открыть быстро</button>
                </div>
              </div>
            )}

            {/* Управление после выпадения предмета */}
            {/* <div className={`${styles.controls_winners} ${styles.winner}`}>
              <div className={styles.winner_wrapper}>
                <button className={`${styles.winner_refresh} ${styles.refresh}`}>
                  <svg
                    className={styles.refresh_icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 3V8M3 8H8M3 8L6 5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.71683 21 4.13247 18.008 3.22302 14"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className={styles.refresh_title}>Попробовать еще раз</span>
                </button>
              </div>
              <div className={styles.winner_wrapper}>
                <button className={`${styles.winner_sell} ${styles.sell}`}>
                  <svg
                    className={styles.sell_icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className={styles.sell_title}>Продать за {sellCount} M</span>
                </button>
              </div>
            </div> */}
          </div>

          <div className={`${styles.case_items} ${styles.items}`}>
            <span className={styles.items_title}>Содержимое кейса </span>
            <ul className={styles.items_list}>
                <Item  />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
