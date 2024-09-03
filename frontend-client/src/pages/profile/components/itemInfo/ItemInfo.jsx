import styles from './ItemInfo.module.scss'
import {MiniPetCard} from "../miniPetCard/MiniPetCard";
import {useWithdrawMutation} from "../../../../api/withdrawalApi";

export const ItemInfo = ({item: item, onClose}) =>{

    const [withdraw] = useWithdrawMutation();

    const onWithdraw = async () =>{
        // try{
        //     petCard = await spinRoulette({boxId: box.id}).unwrap();
        // } catch(error){
        //     alert("Error: " + error)
        // }
        try{
            const result = await withdraw({inventoryItemId: item.id}).unwrap();
            onClose();
        }
        catch (error){
            alert("Error: " + error)
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.cardWrapper}>
                <MiniPetCard petCard={item.petCard} onClick={(item)=>{}} />
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={() => onWithdraw()}>
                    Вывести
                </button>
            </div>
        </div>
    )
}