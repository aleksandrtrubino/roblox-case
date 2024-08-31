
import caseImage from "../../../../assets/cases/case1.png";
import React from "react";
import styles from './caseCard.module.scss';
import {SvgCoin} from "../../../../styles/svg/SvgCoin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

export const CaseCard = ({caseInfo}) => {

return (
    <>
        <li className={`${styles.row_item} ${styles.item}`}>
            <img className={styles.item_image} src={caseImage} alt="case image" />
            <div className={styles.desc}>
                <div className={styles.desc_info}>
                    <span className={styles.info_name}>{caseInfo.name}</span>
                    {/* <span className={styles.info_amount}>100 шт.</span> */}
                </div>
                <div className={styles.item_buy}>
                    <span className={styles.item_price}>
                      {caseInfo.cost}
                        {/*<SvgCoin className={styles.balance_icon} />*/}
                        <FontAwesomeIcon className={styles.balance_icon} icon={faCoins} />
                    </span>
                    <span className={styles.item_button}>Крутануть</span>
                </div>
            </div>
        </li>
    </>
)
}