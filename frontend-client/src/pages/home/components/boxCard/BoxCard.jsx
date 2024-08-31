import styles from './BoxCard.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

export const BoxCard = ({box, onClick}) => {

    const handleClick = () => {
        onClick(box); // Call the onClick function with the pet object
    };

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

    return(
        <div className={styles.main} onClick={handleClick}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={boxRarityById(box.rarity.id)}/>
            </div>
            <div className={styles.nameWrapper}>
                <span className={styles.name}>{box.name}</span>
            </div>
            <div className={styles.priceWrapper}>
                <span className={styles.price}>{box.price}</span>
                <FontAwesomeIcon className={styles.priceIcon} icon={faCoins} />
            </div>
        </div>
    )
}