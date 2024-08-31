import { Link } from 'react-router-dom';
import styles from './balance.module.scss';
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useGetBalanceMeQuery} from "../../../../../api/balanceApi";



export const Balance = () => {
    const balance = useGetBalanceMeQuery();

  return (
    <Link to="/payment" className={styles.balance}>
      <span className={styles.balance_count}> {balance.isSuccess ? balance.data.balance : '?'} </span>
        <FontAwesomeIcon className={styles.balance_icon} icon={faCoins} />
    </Link>
  );
};
