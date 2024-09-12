import styles from './DepositHistoryItem.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

export const DepositHistoryItem = ({balanceEvent}) =>{


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return(
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.deposit}>
                    {"Пополнение +" + balanceEvent.sum}
                    <FontAwesomeIcon className={styles.coinsIcon} icon={faCoins} />
                </div>
                <div className={styles.timestamp}>
                    {formatDate(balanceEvent.createdAt)}
                </div>
            </div>



        </div>
    )
}