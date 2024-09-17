import React, { useState, useEffect, useRef } from 'react';
import styles from './BoxRoulette.module.scss';
import { MiniPetCard } from '../miniPetCard/MiniPetCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import {useSpinRouletteMutation} from "../../../../api/boxRouletteApi";
import {useSellMeMutation} from "../../../../api/sellingApi";
import {useGetInventoryMeQuery} from "../../../../api/inventoryApi";

export const BoxRoulette = ({ box, onClose }) => {
    const [listItems, setListItems] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isFirstStart, setIsFirstStart] = useState(true);
    const [isButtonFading, setIsButtonFading] = useState(false);
    const [isCollectButtonVisible, setIsCollectButtonVisible] = useState(false);
    const listRef = useRef(null);
    const [spinRoulette] = useSpinRouletteMutation();
    const [sell] = useSellMeMutation();
    const inventory = useGetInventoryMeQuery()

    const getPetCard = () => {
        const randomIndex = Math.floor(Math.random() * box.chances.length);
        return box.chances[randomIndex].petCard;
    };

    const generateItems = () => {
        const generatedItems = Array.from({ length: 201 }, () => getPetCard());;
        generatedItems.forEach((item, index) => {
            console.log(`${index}:`, item.pet.name);
        });
        setListItems(generatedItems);
    };

    useEffect(() => {
        generateItems();
    }, []);

    const start = async () => {
        if (isStarted) return;
        //listItems[100] = listItems[0]
        //setListItems(listItems);
        let petCard;
        try{
            petCard = await spinRoulette({boxId: box.id}).unwrap();
        } catch(error){
            alert("Error: " + error)
        }
        listItems[100] = petCard;

        setIsStarted(true);
        setIsCollectButtonVisible(false);

        if (!isFirstStart) {
            //TODO: wheelApi
            generateItems();
        }
        else setIsFirstStart(false);

        // Начинаем плавное выцветание кнопки
        setIsButtonFading(true);

        setTimeout(() => {
            if (listRef.current) {
                listRef.current.style.left = '50%';
                listRef.current.style.transform = 'translate3d(-50%, 0, 0)';
            }
        }, 0);

        const handleTransitionEnd = () => {
            setIsStarted(false);
            const item = listRef.current.querySelectorAll('li')[100];
            item.classList.add(styles.active);
            const data = JSON.parse(item.getAttribute('data-item'));
            console.log(data);

            // Показываем кнопку "Забрать выигрыш" после завершения анимации
            setIsCollectButtonVisible(true);
        };

        listRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });

    };

    const handleSell = async () =>{
        try{
            const res = await sell({inventoryItemId: inventory.data.items[0].id}).unwrap();
            onClose()
        }
        catch (error){
            alert("Error selling pet")
        }
    }

    return (
        <div className={styles.rouletteWrapper}>
            <img className={styles.pointer} src="images/pointer.png" alt="Pointer" />
            <div className={styles.roulette}>
                <div className={styles.scope}>
                    <ul className={styles.list} ref={listRef}>
                        {listItems.map((petCard, index) => (
                            <li key={index} className={styles.listItem} data-item={JSON.stringify(petCard)}>
                                <MiniPetCard petCard={petCard} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {(
                <button
                    className={`${styles.start} ${isButtonFading ? styles.fadeOut : ''}`}
                    onClick={start}
                >
                    {
                        spinRoulette.isLoading ?
                            <>
                            loading...
                            </>
                            :
                            <>
                                {"Крутануть ( -" + box.price}
                                <FontAwesomeIcon className={styles.coinsIcon} icon={faCoins} />
                                {" )"}
                            </>
                    }

                </button>
            )}
            {isCollectButtonVisible && inventory.isSuccess && (
                <>
                    <button className={styles.collect} onClick={onClose}>
                        Забрать
                    </button>
                    <button className={styles.sell} onClick={handleSell}>
                        {"Продать (+" + inventory.data.items[0].petCard.price }<FontAwesomeIcon className={styles.coinsIcon} icon={faCoins} />{")"}

                    </button>
                </>

            )}
        </div>
    );
};
