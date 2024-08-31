import styles from './BoxInfo.module.scss'
import {BoxCard} from "../boxCard/BoxCard";
import React from "react";
import {MiniPetCard} from "../miniPetCard/MiniPetCard";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const BoxInfo = ({box, onClick}) =>{

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
        <div className={styles.main}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={boxRarityById(box.rarity.id)}/>
            </div>
            <div className={styles.nameWrapper}>
                <span className={styles.name}>{box.name}</span>
            </div>
            <div className={styles.petCardsWrapper}>
                <div className={styles.petCards}>
                    {box.chances.map((chance) => <MiniPetCard
                    key = {chance.petCard.id}
                    petCard = {chance.petCard}/>)}
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={onClick}>
                    {"Крутануть за " + box.price}
                    <FontAwesomeIcon className={styles.coinsIcon} icon={faCoins} />
                </button>
            </div>
        </div>
    )
}