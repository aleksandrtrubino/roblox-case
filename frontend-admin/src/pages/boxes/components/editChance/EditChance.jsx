import styles from './EditChance.module.scss'

import {useEffect, useState} from "react";

export const EditChance = ({chance, setChance, isActive, onClick, className}) =>{

    const handleClick = () => {

    };

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

   // const [chance, setChance] = useState({petCardId: null, percent: null});

    const handlePercentChange = (e) => {
        setChance({...chance, percent: e.target.value})
    };

    // useEffect(() => {
    //     setChanceDto({...chanceDto, petCardId: petCard.id})
    // }, [petCard]);

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
                <input
                    className={styles.percentInput}
                    type="number"
                    onChange={handlePercentChange}
                    placeholder="0"
                    value={chance.percent}/>
                <span className={styles.percentSymbol}>%</span>
            </div>
        </div>
    )

}


