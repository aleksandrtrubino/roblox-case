import { Link } from 'react-router-dom';
import styles from './balance.module.scss';
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const balanceCount = 12

export const Balance = () => {

  return (
    <Link to="/payment" className={styles.balance}>
      <span className={styles.balance_count}> {balanceCount} </span>
        <FontAwesomeIcon className={styles.balance_icon} icon={faCoins} />
    </Link>
  );
};
