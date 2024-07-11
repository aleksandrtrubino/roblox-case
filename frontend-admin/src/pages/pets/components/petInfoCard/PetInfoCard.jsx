
import styles from './PetInfoCard.module.scss'
import {useDeletePetMutation} from "../../../../api/petApi";

export const PetInfoCard = ({pet, onEdit, onClose}) =>{

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]
    const rarityNameById = [
        '',
        'Common',
        'Uncommon',
        'Rare',
        'Ultra-rare',
        'Legendary'
    ]

    const [deletePet] = useDeletePetMutation();

    const onDelete = async () => {
        try {
            const response = await deletePet({petId: pet.id}).unwrap();
            console.log("Pet deleted successfully", response);
            onClose()
        } catch (error) {
            console.error("Failed to update pet", error);
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.imageWrapper} >
                <img className={styles.image} src={pet?.image?`data:image/webp;base64,${pet.image}`:"/images/default-product-image.jpg"} alt="Изображение питомца"/>
                <div className={styles.rarity + ' ' + (rarityById[pet?.rarity.id])}></div>
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>ID</div>
                <div className={styles.property}>{pet?.id}</div>
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>Имя</div>
                <div className={styles.property}>{pet?.name}</div>
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>Редкость</div>
                <div className={styles.property}>{rarityNameById[pet?.rarity.id]}</div>
            </div>
            <div className={styles.buttonWrapper}>
                <button onClick={onEdit} className={styles.editButton}>Редактировать</button>
                <button onClick={onDelete} className={styles.deleteButton}>Удалить</button>
            </div>

        </div>
    )
}