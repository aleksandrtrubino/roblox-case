import styles from './WithdrawHistory.module.scss'
import {useGetWithdrawalsMeQuery} from "../../../../api/withdrawalApi";
import {MiniPetCard} from "../miniPetCard/MiniPetCard";
import React from "react";
import {Withdrawal} from "../withdrawal/Withdrawal";

export const WithdrawHistory = () =>{

    const withdrawals = useGetWithdrawalsMeQuery();

    let content;
    if(withdrawals.isSuccess && withdrawals.data && withdrawals.data.length > 0){
        content = withdrawals.data.map((withdrawal) => <Withdrawal
            key = {withdrawal.id}
            withdrawal = {withdrawal}
        />);
    }

    return(
        <div className={styles.main}>
            {content}
        </div>
    )

}