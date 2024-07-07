import {PetItem} from "./components/petItem/PetItem";
import styles from './Pets.module.scss';
import {useGetPetsQuery} from "../../api/petApi";
import {useEffect, useState} from "react";
import Modal from "../../common/containers/modal/Modal";
import {PetInfoCard} from "./components/petInfoCard/PetInfoCard";

export const Pets = () => {

    const pets = useGetPetsQuery();
    const [currentPet, setCurrentPet] = useState()

    useEffect(() => {
        if (pets.isSuccess && pets.data && pets.data.length > 0) {
            setCurrentPet(pets.data[0]);

        }
    }, [pets.isSuccess, pets.data]);

    const handlePetItemClick = (pet) => {
        setCurrentPet(pet);
        setIsModalOpen(true);
    };

    let content = null;
    if(pets.isSuccess && pets.data && pets.data.length > 0){
        content = pets.data.map((pet) => <PetItem
            key = {pet.id}
            pet={pet}
            isActive={false}
            onClick={() => handlePetItemClick(pet)}/>);
    }



    const [isModalOpen, setIsModalOpen] = useState(false);


    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        pets.isSuccess && pets.data && pets.data.length > 0 ?
            <div className={styles.pets}>
                <div className={styles.header}>
                    Список питомцев
                </div>
                <div className={styles.petList}>
                    {content}
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                   <PetInfoCard pet={currentPet}/>
                </Modal>

            </div>

            :
            pets.isLoading ?
                'loading..'
                :
                pets.isError ?
                    'error'
                    :
                    'pizdec'
    )
}