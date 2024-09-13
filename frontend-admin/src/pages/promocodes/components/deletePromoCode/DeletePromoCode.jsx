import styles from './DeletePromoCode.module.scss'
import {useDeletePromoCodeMutation} from "../../../../api/promoCodeApi";

export const DeletePromoCode =({onClose, promoCode}) =>{

    const [deletePromoCode] = useDeletePromoCodeMutation()

    const handleYes = async () =>{
        try{
            await deletePromoCode(promoCode.id)
        }
        catch (e){
            alert("Ошибка при удалении промокода. Попробуйте позже")
        }
    }

    const handleNo = () =>{
      onClose()
    }

    return(
        <div className={styles.main}>
            <span className={styles.text}>
                {"Вы действительно хотите удалить промокод " + promoCode.code + " ?"}
            </span>
            <div className={styles.buttonsWrapper}>
                <button className={styles.noButton} onClick={()=>handleNo()}>
                    Нет
                </button>
                <button className={styles.yesButton} onClick={()=>handleYes()}>
                    Да
                </button>
            </div>
        </div>
    )
}