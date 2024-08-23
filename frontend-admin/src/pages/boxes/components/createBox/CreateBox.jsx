import styles from './CreateBox.module.scss'
import { useEffect, useState } from "react";
import { DropdownMenu } from "../dropdownMenu/DropdownMenu";
import { useGetPetCardsQuery } from "../../../../api/petCardApi";
import { useCreateBoxMutation } from "../../../../api/boxesApi";
import { MiniPetCardItem } from "../miniPetCardItem/MiniPetCardItem";
import { EditChance } from "../editChance/EditChance";

export const CreateBox = ({ onClose }) => {
    const { data: petCardsData, isSuccess, isLoading, isError } = useGetPetCardsQuery();
    const [createBox, { isLoading: isCreating }] = useCreateBoxMutation();

    const boxRarityById = (id) => {
        switch (id) {
            case 1:
                return "/images/case/common.png";
            case 2:
                return "/images/case/uncommon.png";
            case 3:
                return "/images/case/rare.png";
            case 4:
                return "/images/case/legendary.png";
            default:
                return "";
        }
    };

    const rarityList = [
        { id: 1, name: 'Common' },
        { id: 2, name: 'Uncommon' },
        { id: 3, name: 'Ultra-rare' },
        { id: 4, name: 'Legendary' },
    ];

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rarity, setRarity] = useState(rarityList[0]);
    const [chanceList, setChanceList] = useState([]);

    useEffect(() => {
        setRarity(rarityList[0]);
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handlePetCardItemClick = (petCard) => {
        const exists = chanceList.some(chance => chance.petCard.id === petCard.id);
        if (exists) {
            setChanceList(chanceList.filter(chance => chance.petCard.id !== petCard.id));
        } else {
            setChanceList([...chanceList, { petCard: petCard, percent: null }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const boxDto = {
            name,
            price: parseInt(price),
            rarityId: rarity.id,
            chances: chanceList.map(chance => ({ petCardId: chance.petCard.id, percent: chance.percent })),
        };

        try {
            await createBox(boxDto).unwrap();
            // Optionally close the form or give feedback to the user
            onClose();
        } catch (error) {
            console.error('Failed to create box: ', error);
        }
    };

    let content;
    if (isSuccess && petCardsData && petCardsData.length > 0) {
        content = petCardsData.map((petCard) => (
            <MiniPetCardItem
                key={petCard.id}
                petCard={petCard}
                isActive={chanceList.some(chance => chance.petCard.id === petCard.id)}
                onClick={() => handlePetCardItemClick(petCard)}
            />
        ));
    }

    const setChance = (updatedChance) => {
        setChanceList(
            chanceList.map((chance) =>
                chance.petCard.id === updatedChance.petCard.id ? { ...chance, percent: updatedChance.percent } : chance
            )
        );
    };

    return (
        isSuccess && petCardsData && petCardsData.length > 0 ? (
            <form className={styles.main} onSubmit={handleSubmit}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={boxRarityById(rarity.id)} alt="Box Image" />
                </div>
                <div className={styles.nameWrapper}>
                    <div className={styles.propertyName}>Имя:</div>
                    <input
                        className={styles.nameInput}
                        type="text"
                        onChange={handleNameChange}
                        value={name}
                    />
                </div>
                <div className={styles.priceWrapper}>
                    <div className={styles.propertyName}>Цена:</div>
                    <input
                        className={styles.priceInput}
                        type="number"
                        onChange={handlePriceChange}
                        value={price}
                    />
                </div>
                <div className={styles.rarityWrapper}>
                    <div className={styles.propertyName}>Редкость:</div>
                    <DropdownMenu items={rarityList} selectedItem={rarity} setSelectedItem={setRarity} />
                </div>
                <div className={styles.selectedWrapper}>
                    <div className={styles.selected}>
                        {chanceList.map((chance) => (
                            <EditChance
                                key={chance.petCard.id}
                                chance={chance}
                                setChance={setChance}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.cardsWrapper}>
                    <div className={styles.cards}>{content}</div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.createButton} type="submit">
                        Создать
                    </button>
                </div>
            </form>
        ) : isLoading ? (
            'loading...'
        ) : isError ? (
            'error'
        ) : (
            'pizdec'
        )
    );
}
