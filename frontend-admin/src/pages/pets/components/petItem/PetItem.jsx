
import styles from './PetItem.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export const PetItem = ({pet, isActive, onClick}) =>{

    const handleClick = () => {
        onClick(pet); // Call the onClick function with the pet object
    };

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]

    return(
        <div className={styles.pet + " " + (isActive ? styles.pet_active : '')} onClick={handleClick}>
            <div className={styles.imageWrapper} >
                <img className={styles.image} src={pet.image?`data:image/webp;base64,${pet.image}`:"/images/default-product-image.jpg"} alt="Изображение питомца"/>
            </div>
            <div className={styles.nameWrapper}>
                <div className={styles.name}>{pet.name}</div>
                <div className={styles.rarity + ' ' + (rarityById[pet.rarity.id])}></div>
            </div>
        </div>

    )
}

export const AddPetItem = ({onClick}) => {

    return(
        <div className={styles.pet} onClick={onClick}>
            <FontAwesomeIcon className={styles.petAdd} icon={faPlus} />
        </div>

    )
}