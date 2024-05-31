//* Импортирование блока с бонусами ( Bonus )
import React from 'react';
import { Bonus } from './components/Bonus/Bonus';
// import { NavLink } from "react-router-dom";
import caseImage from '../../assets/cases/case1.png';

import styles from './cases.module.scss';

export const Cases = () => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles.cases}>
      <Bonus />
      <div className={styles.cases_wrapper}>
        <ul className={styles.list}>
          <li className={styles.row}>
            <h1 className={styles.row_title}>Летние кемпинги</h1>
            <ul className={styles.row_list}>
              <li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li>
              <li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li>
              <li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li>
              <li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li><li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li><li className={`${styles.row_item} ${styles.item}`}>
                <img className={styles.item_image} src={caseImage} alt="case image" />
                <div className={styles.desc}>
                  <div className={styles.desc_info}>
                    <span className={styles.info_name}>Шаровары</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                  </div>
                  <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      228
                      <svg
                        className={styles.balance_icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
