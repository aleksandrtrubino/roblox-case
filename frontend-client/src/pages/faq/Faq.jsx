import React from 'react';

import styles from './faq.module.scss';

export const Faq = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles.faq}>
      <div className={styles.faq_wrapper}>
        {/*<ul className={`${styles.faq_features} ${styles.features}`}>*/}
        {/*  <li className={`${styles.features_item}`}></li>*/}
        {/*  <li className={`${styles.features_item}`}></li>*/}
        {/*  <li className={`${styles.features_item}`}></li>*/}
        {/*  <li className={`${styles.features_item}`}></li>*/}
        {/*</ul>*/}
        <div className={`${styles.faq_drop} ${styles.drop}`}>
          <span className={styles.drop_title}>Часто задаваемые вопросы</span>
          <ul className={styles.drop_list}>
            <li onClick={() => handleActive(0)} className={`${styles.item}`}>
              <div className={styles.item_header}>
                <span className={styles.item_title}>
                  Что делать, если после пополнения баланса, деньги не поступили на счет?
                </span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  />
                </svg>
              </div>
              <div
                className={
                  activeIndex === 0 ? `${styles.dropper} ${styles.active}` : `${styles.dropper}`
                }>
                <span className={styles.dropper_description}>
                  После оплаты необходимо подождать, если спустя пару часов, деньги не поступили,
                  пожалуйста, обратитесь в поддержку, указав реквизиты платежа.
                </span>
              </div>
            </li>
            <li onClick={() => handleActive(1)} className={`${styles.item}`}>
              <div className={styles.item_header}>
                <span className={styles.item_title}>
                  Что делать если предмет не смогли вывести?
                </span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  />
                </svg>
              </div>
              <div
                className={
                  activeIndex === 1 ? `${styles.dropper} ${styles.active}` : `${styles.dropper}`
                }>
                <span className={styles.dropper_description}>
                  Ничего страшного, просто на момент вывода не нашлось свободного администратора,
                  который смог бы вывести предмет. В таком случае вам нужно повторить запрос чуть
                  позже.
                </span>
              </div>
            </li>
            <li onClick={() => handleActive(2)} className={`${styles.item}`}>
              <div className={styles.item_header}>
                <span className={styles.item_title}>Можно ли вывести средства себе на карту?</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  />
                </svg>
              </div>
              <div
                className={
                  activeIndex === 2 ? `${styles.dropper} ${styles.active}` : `${styles.dropper}`
                }>
                <span className={styles.dropper_description}>
                  Нет, такой возможности нет, также как и нет возможности вернуть потраченные
                  средства на нашем сайте.
                </span>
              </div>
            </li>
            <li onClick={() => handleActive(3)} className={`${styles.item}`}>
              <div className={styles.item_header}>
                <span className={styles.item_title}>Как продать или вывести предмет с сайта?</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  />
                </svg>
              </div>
              <div
                className={
                  activeIndex === 3 ? `${styles.dropper} ${styles.active}` : `${styles.dropper}`
                }>
                <span className={styles.dropper_description}>
                  В профиле пользователя находите раздел инвентаря, выбираете предметы которые нужно
                  вывести/продать и нажимаете нужную вам кнопку.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${styles.faq_alert} ${styles.alert}`}>
          <span className={styles.alert_title}>
            Также вы всегда можете написать нам в поддержку и мы максимально быстро ответим на ваш
            вопрос.
          </span>
        </div>
      </div>
    </div>
  );
};
