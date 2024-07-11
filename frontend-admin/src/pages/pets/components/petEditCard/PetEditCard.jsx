import styles from "./PetEditCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "../dropdownMenu/DropdownMenu";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUpdatePetMutation } from "../../../../api/petApi";

export const PetEditCard = ({ pet, onClose }) => {
    const { register, handleSubmit } = useForm();
    const rarityList = [
        { id: 1, name: 'Common' },
        { id: 2, name: 'Uncommon' },
        { id: 3, name: 'Rare' },
        { id: 4, name: 'Ultra-rare' },
        { id: 5, name: 'Legendary' },
    ];
    const [imageFile, setImageFile] = useState();
    const [name, setName] = useState(pet.name);
    const [rarity, setRarity] = useState(rarityList[pet.rarity.id - 1]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        } else {
            setImageFile(null);
        }
    };

    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary,
    ];

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const [updatePet] = useUpdatePetMutation();

    const onSubmit = async () => {
        const petDto = {
            name: name,
            rarityId: rarity.id,
        };

        try {
            const response = await updatePet({petId: pet.id, petDto, imageFile }).unwrap();
            console.log("Pet updated successfully", response);
            onClose()
        } catch (error) {
            console.error("Failed to update pet", error);
        }
    };

    return (
        <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.imageWrapper}>
                {!imageFile ? (
                    <>
                        <img
                            src={`data:image/webp;base64,${pet.image}`}
                            alt="Selected"
                            className={styles.image}
                        />
                        <div className={styles.rarity + ' ' + rarityById[rarity.id]}></div>
                        <label className={styles.imageButton}>
                            <input
                                className={styles.imageInput}
                                type="file"
                                accept="image/webp"
                                onChange={handleImageChange}
                                name="image"
                            />
                            <FontAwesomeIcon className={styles.imageButton_icon} icon={faRetweet} />
                        </label>
                    </>
                ) : (
                    <>
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Selected"
                            className={styles.image}
                        />
                        <div className={styles.rarity + ' ' + rarityById[rarity.id]}></div>
                        <div className={styles.imageClose} onClick={() => setImageFile(null)}>
                            &times;
                        </div>
                    </>
                )}
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>ID</div>
                <div>{pet.id}</div>
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>Имя</div>
                <input
                    className={styles.nameInput}
                    onChange={handleNameChange}
                    type="text"
                    value={name}
                    name="name"
                    required
                />
            </div>
            <div className={styles.propertyWrapper}>
                <div className={styles.propertyName}>Редкость</div>
                <DropdownMenu items={rarityList} selectedItem={rarity} setSelectedItem={setRarity} />
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.createButton} type="submit">
                    Сохранить
                </button>
            </div>
        </form>
    );
};
