import styles from "./ChanceItem.module.scss";

export const ChanceItem = ({chance, isActive, onClick, className}) =>{

    const handleClick = () => {
        onClick(chance); // Call the onClick function with the pet object
    };

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]

    const formatPercent = (percent) =>{
        return percent/100;
    }

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
            className={
                styles.petCard +
                " " + (isActive ? styles.petCard_active : '')
                + ' ' + styles.rarity + ' ' + (rarityById[chance.petCard.pet.rarity.id]
                    + ' ' + className)
            }
            onClick={handleClick}>
            <div className={styles.imageWrapper} >
                <img className={styles.image} src={chance.petCard.pet.image?`data:image/webp;base64,${chance.petCard.pet.image}`:"/images/default-product-image.jpg"} alt="Изображение питомца"/>
            </div>
            <div className={styles.propertyListWrapper}>
                <div className={styles.propertyList}>{chance.petCard.properties
                    .slice() // Создаем копию массива, чтобы не мутировать исходный массив
                    .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
                    .map((property) => propertyById[property.id])
                }</div>
            </div>
            <div className={styles.nameWrapper}>
                <div className={styles.name}>{chance.petCard.pet.name}</div>
            </div>
            <div className={styles.percentWrapper}>
                <div className={styles.percent}>{formatPercent(chance.percent)}%</div>
            </div>
        </div>
    )

}