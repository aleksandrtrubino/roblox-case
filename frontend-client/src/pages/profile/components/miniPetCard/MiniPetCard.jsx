import styles from './MiniPetCard.module.scss'

export const MiniPetCard = ({petCard}) =>{

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]

    const propertyById = [
        (<></>),
        (<div className={styles.property + ' ' + styles.property_neon}>
            N
        </div>),
        (<div className={styles.property + ' ' + styles.property_megaNeon}>
            M
        </div>),
        (<div className={styles.property + ' ' + styles.property_flyable}>
            F
        </div>),
        (<div className={styles.property + ' ' + styles.property_rideable}>
            R
        </div>),
    ]

    return(
        <div
            className={styles.main}>
            <div className={styles.imageWrapper} >
                <img className={styles.image} src={petCard.pet.image?`data:image/webp;base64,${petCard.pet.image}`:"/images/default-product-image.jpg"} alt="Изображение питомца"/>
            </div>
            <div className={styles.propertyListWrapper}>
                <div className={styles.propertyList}>{petCard.properties
                    .slice() // Создаем копию массива, чтобы не мутировать исходный массив
                    .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
                    .map((property) => propertyById[property.id])
                }</div>
            </div>
            <div className={styles.nameWrapper}>
                <div className={styles.name}>{petCard.pet.name}</div>
                <div className={styles.rarity + ' ' + (rarityById[petCard.pet.rarity.id])}></div>
            </div>
        </div>
    )
}