import { Link } from 'react-router-dom';
import styles from './balance.module.scss';
import { useSelector } from 'react-redux';

const balanceCount = 12

export const Balance = () => {

  return (
    <Link to="/payment" className={styles.balance}>
      <span className={styles.balance_count}> {balanceCount} </span>
      <span className={styles.balance_valute}>M</span>
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
    </Link>
  );
};
