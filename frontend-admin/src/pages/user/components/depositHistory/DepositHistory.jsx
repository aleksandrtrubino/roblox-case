import styles from './DepositHistory.module.scss'
import {DepositHistoryItem} from "../depositHistoryItem/DepositHistoryItem";
import {useGetBalanceEventByUserIdQuery} from "../../../../api/balanceEventApi";

export const DepositHistory = ({userId}) => {

    const balanceEvents = useGetBalanceEventByUserIdQuery({userId});

    let content = [];
    if (balanceEvents.isSuccess && balanceEvents.data && balanceEvents.data.length > 0) {
        content = balanceEvents.data.map((balanceEvent) => (
            <DepositHistoryItem key={balanceEvent.id} balanceEvent={balanceEvent} />
        ));
    }
    else {
        content = ''
    }

    return(
        <>
            {content}
        </>
    )
}