
import styles from './PetCreationCard.module.scss'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {DropdownMenu} from "../dropdownMenu/DropdownMenu";
import {useCreatePetMutation} from "../../../../api/petApi";

export const PetCreationCard = ({onClose}) => {

    const rarityList = [
        {id: 1, name: 'Common'},
        {id: 2, name: 'Ucommon'},
        {id: 3, name: 'Rare'},
        {id: 4, name: 'Ultra-rare'},
        {id: 5, name: 'Legendary'},
    ]
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState();
    const [rarity, setRarity] = useState(rarityList[0]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
        else{
            setImageFile(null);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };


    const rarityById = [
        '',
        styles.rarity_common,
        styles.rarity_uncommon,
        styles.rarity_rare,
        styles.rarity_ultraRare,
        styles.rarity_legendary
    ]

    const [createPet] = useCreatePetMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const petDto = {
            name: name,
            rarityId: rarity.id
        }


        try {
            const response = await createPet({petDto, imageFile}).unwrap();
            onClose()
        } catch (error) {
            console.error("Failed to update pet", error);
        }
    }


    return(
        <form className={styles.main} onSubmit={handleSubmit}>

                <div className={styles.imageWrapper}>
                    {!imageFile ?
                        (<label className={styles.imageButton}>
                        <input className={styles.imageInput}
                               type="file"
                               accept="image/webp"
                               onChange={handleImageChange}
                               required/>
                        <FontAwesomeIcon className={styles.imageButton_icon} icon={faUpload} />
                        <span className={styles.imageButton_text}>.webp</span>
                    </label>)
                    :
                        (
                            <>
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Selected"
                                    className={styles.image}
                                />
                                <div className={styles.rarity + ' ' + (rarityById[rarity.id])}></div>
                                <div className={styles.imageClose} onClick={()=> setImageFile(null)}>&times;</div>
                            </>
                        )}

                </div>
                <div className={styles.propertyWrapper}>
                    <div className={styles.propertyName}>Имя</div>
                    <input
                        className={styles.nameInput}
                        type="text"
                        onChange={handleNameChange}
                        value={name}/>
                </div>
                <div className={styles.propertyWrapper}>
                    <div className={styles.propertyName}>Редкость</div>
                    <DropdownMenu items={rarityList} selectedItem={rarity} setSelectedItem={setRarity}/>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.createButton}>Создать</button>
                </div>
        </form>
    )
}