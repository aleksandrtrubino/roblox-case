import styles from './Withdrawals.module.scss'
import {useGetAllWithdrawalsQuery} from "../../api/withdrawalApi";
import {Withdrawal} from "./components/withdrawal/Withdrawal";

export const Withdrawals = () =>{

    const withdrawals = useGetAllWithdrawalsQuery();

    let content;
    if(withdrawals.isSuccess && withdrawals.data && withdrawals.data.length > 0){
        content = withdrawals.data.map((withdrawal) =>
        <Withdrawal
            key={withdrawal.id}
            withdrawal={withdrawal}
        />)
    }

    return(
        <div className={styles.main}>
            <span className={styles.header}>
                Выводы
            </span>
            {content}
        </div>
    )
}