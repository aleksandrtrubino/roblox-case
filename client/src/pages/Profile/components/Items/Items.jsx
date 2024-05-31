import { Item } from '../../../../components/common/Item/Item';
import styles from './items.module.scss';

export const Items = () => {
  return (
    <div className={styles.items}>
      <div className={`${styles.items_header} ${styles.header}`}>
        <button className={styles.header_button}>Все скины</button>
        <div className={`${styles.header_sorted} ${styles.sorted}`}>
          <button className={styles.sorted_button}>
            Сортировать предметы: <span>по убыванию цены</span>
            <svg
              className={styles.sorted_icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
            </svg>
          </button>
          <div className={styles.sorted_list}></div>
        </div>
      </div>
      <div className={`${styles.items_body} ${styles.body}`}>

        <div className={`${styles.body_list} ${styles.list}`}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>

        {/* <div className={`${styles.body_nothing} ${styles.nothing}`}>
          <span className={styles.nothing_title}>У вас нет предметов</span>
        </div> */}

      </div>
      <div className={`${styles.items_controls} ${styles.controls}`}>
        <div className={styles.controls_wrapper}>
          <div className={`${styles.controls_pagination} ${styles.pagination}`}>
            <button className={styles.pagination_button}>1</button>
            <button className={styles.pagination_button}>2</button>
            <button className={styles.pagination_button}>3</button>
            <button className={styles.pagination_button}>4</button>
            <button className={styles.pagination_button}>5</button>
          </div>
          <div className={`${styles.controls_manage} ${styles.manage}`}>
            <span className={styles.manage_selected}>Выбрано 3 предмета</span>
            <div className={styles.manage_buttons}>
              <button className={`${styles.manage_button} ${styles.manage_sell}`}>Продать</button>
              <button className={`${styles.manage_button} ${styles.manage_output}`}>Вывести</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
