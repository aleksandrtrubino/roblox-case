import styles from './CreatePetCardItem.module.scss';
import { useState } from "react";
import { PetCardItem } from "../petCard/PetCardItem";
import { AddPetCardButton } from "../addPetCardButton/AddPetCardButton";
import { AddPetItem, PetItem } from "../../../pets/components/petItem/PetItem";
import { useGetPetsQuery } from "../../../../api/petApi";
import {useCreatePetCardMutation} from "../../../../api/petCardApi";

export const CreatePetCardItem = ({onClose}) => {

    const propertyList = [
        { id: 1, name: "neon", className: styles.property_neon },
        { id: 2, name: "mega-neon", className: styles.property_megaNeon },
        { id: 3, name: "flyable", className: styles.property_flyable },
        { id: 4, name: "rideable", className: styles.property_rideable }
    ];

    const pets = useGetPetsQuery();
    const [createPetCard] = useCreatePetCardMutation();

    const [petCard, setPetCard] = useState(null);
    const [petId, setPetId] = useState();
    const [propertyIds, setPropertyIds] = useState(new Set());

    const handlePetItemClick = (pet) => {
        const currentProperties = Array.from(propertyIds).map(id => propertyList.find(prop => prop.id === id));
        const currentPetCard = {
            pet: pet,
            properties: currentProperties
        };
        setPetCard(currentPetCard);
        setPetId(pet.id)
    };

    const togglePropertyId = (propertyId) => {
        const newPropertyIds = new Set(propertyIds);

        if (newPropertyIds.has(propertyId)) {
            newPropertyIds.delete(propertyId);
        } else {
            newPropertyIds.add(propertyId);
        }

        setPropertyIds(newPropertyIds);

        const updatedProperties = Array.from(newPropertyIds).map(id => propertyList.find(prop => prop.id === id));
        const currentPetCard = {
            pet: petCard.pet,
            properties: updatedProperties
        };
        setPetCard(currentPetCard);
    };

    const renderProperties = () => {
        return propertyList.map(property => (
            <div
                key={property.id}
                onClick={() => togglePropertyId(property.id)}
                className={`${styles.propertyWrapper} ${propertyIds.has(property.id) ? styles.propertyWrapper_active : ''}`}
            >
                <div className={`${styles.property} ${property.className}`}>
                    {property.name.charAt(0).toUpperCase()}
                </div>
            </div>
        ));
    };

    const handleCreateButtonClick = async (e) =>{
        e.preventDefault()

        const petCardDto = {
            petId: petId,
            propertyIds: Array.from(propertyIds)
        }

        if(petId !== null){
            try{
                const response = await createPetCard({petCardDto}).unwrap();
                onClose()
            }
            catch (error){
                console.log("Error when creating petCard", error)
            }
        }
    }

    let content;
    if (pets.isSuccess && pets.data && pets.data.length > 0) {
        content = pets.data.map((pet) => (
            <PetItem
                key={pet.id}
                pet={pet}
                isActive={false}
                onClick={() => handlePetItemClick(pet)}
            />
        ));
    }

    return (
        <form className={styles.main} onSubmit={handleCreateButtonClick}>
            <div className={styles.petCardWrapper}>
                {petCard === null ? (
                    <AddPetCardButton />
                ) : (
                    <>
                        <PetCardItem petCard={petCard} isActive={false} onClick={() => {}} />
                        <div className={styles.properties}>
                            {renderProperties()}
                        </div>
                    </>
                )}
            </div>
            <div className={styles.petsWrapper}>
                {content}
            </div>
            <button className={styles.saveButton} onClick={() => {}}>Создать</button>
        </form>
    );
};
