import styles from './BoxItem.module.scss'
import {ChanceItem} from "../chanceItem/ChanceItem";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "../../../../common/containers/modal/Modal";
import {EditBox} from "../editBox/EditBox";
import {useState} from "react";

export const BoxItem = ({box}) => {

    const boxRarityById = (id) =>{
        switch (id){
            case 1:
                return "/images/case/common.png";
            case 2:
                return "/images/case/uncommon.png";
            case 3:
                return "/images/case/rare.png";
            case 4:
                return "/images/case/legendary.png";
        }
    }

    const [isEditBoxOpen, setEditBoxOpen] = useState(false)



    return(
        <div className={styles.main}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={boxRarityById(box.rarity.id)}/>
            </div>
            <div className={styles.nameWrapper}>
                <div className={styles.name}>
                {box.name}
                </div>
            </div>
            <div className={styles.priceWrapper}>
                <div className={styles.price}>
                    {box.price}
                </div>
                <FontAwesomeIcon className={styles.priceIcon} icon={faCoins} />
            </div>
            <div className={styles.chanceWrapper}>
                {box.chances.map((chance) =>
                    <ChanceItem className={styles.petCard} chance={chance} isActive={false} onClick={()=>{}}/>)}
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.editButton} onClick={()=>setEditBoxOpen(true)}>
                    Редактировать
                </button>
                <button className={styles.deleteButton}>
                    Удалить
                </button>
            </div>
            <Modal isOpen={isEditBoxOpen} onClose={()=>setEditBoxOpen(false)}>
                <EditBox box={box} onClose={()=>setEditBoxOpen(false)} />
            </Modal>
        </div>
    )
}