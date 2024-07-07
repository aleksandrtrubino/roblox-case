
import styles from './PetInfoCard.module.scss'

export const PetInfoCard = ({pet}) =>{

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]

    return(
        <div className={styles.petInfo}>
            <div className={styles.imageWrapper} >
                <img className={styles.image} src={pet?.image?`data:image/webp;base64,${pet.image}`:"/images/default-product-image.jpg"} alt="Изображение питомца"/>
            </div>
            <div className={styles.rarity + ' ' + (rarityById[pet?.rarity.id])}></div>
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
                <div className={styles.property}>{pet?.rarity.name.toUpperCase()}</div>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.editButton}>Редактировать</button>
                <button className={styles.deleteButton}>Удалить</button>
            </div>

        </div>
    )
}