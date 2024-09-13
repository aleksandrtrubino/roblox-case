import styles from './PromoCodeItem.module.scss'
import {useDeletePromoCodeMutation, useUpdatePromoCodeMutation} from "../../../../api/promoCodeApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {EditPromoCode} from "../editPromoCode/EditPromoCode";
import Modal from "../../../../common/containers/modal/Modal";
import {useState} from "react";
import {DeletePromoCode} from "../deletePromoCode/DeletePromoCode";

export const PromoCodeItem = ({promoCode}) =>{

    const [isEditPromoCodeOpen, setEditPromoCodeOpen] = useState(false);
    const [isDeletePromoCodeOpen, setDeletePromoCodeOpen] = useState(false);
    const [deletePromoCode] = useDeletePromoCodeMutation();

    return(
        <div className={styles.main}>
            <div className={styles.codeWrapper}>
                <span className={styles.code}>
                    {promoCode.code}
                </span>
            </div>
            <div className={styles.numberWrapper}>
                {promoCode.type.id === 1 ?
                    <span className={styles.number}>
                        {"+ " + promoCode.number + " "}
                        <FontAwesomeIcon icon={faCoins}/>
                    </span>
                    :
                    <span className={styles.number}>
                   {"+ " + promoCode.number + " %"}
                    </span>
                }

            </div>
            <div className={styles.usesWrapper}>
                <div className={styles.uses}>
                    {promoCode.uses + " / " + promoCode.usesNumber}
                </div>
            </div>
            <button className={styles.editButton} onClick={()=>setEditPromoCodeOpen(true)}>
                Редактировать
            </button>
            <button className={styles.deleteButton} onClick={()=>setDeletePromoCodeOpen(true)}>
                Удалить
            </button>
            <Modal isOpen={isEditPromoCodeOpen} onClose={()=>setEditPromoCodeOpen(false)}>
              <EditPromoCode promoCode={promoCode} onClose={()=>setEditPromoCodeOpen(false)} />
            </Modal>
            <Modal isOpen={isDeletePromoCodeOpen} onClose={()=>setDeletePromoCodeOpen(false)}>
                <DeletePromoCode promoCode={promoCode} onClose={()=>setDeletePromoCodeOpen(false)} />
            </Modal>
        </div>
    )
}