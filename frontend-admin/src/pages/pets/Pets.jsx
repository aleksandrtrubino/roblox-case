import {AddPetItem, PetItem} from "./components/petItem/PetItem";
import styles from './Pets.module.scss';
import {useGetPetsQuery} from "../../api/petApi";
import {useEffect, useState} from "react";
import Modal from "../../common/containers/modal/Modal";
import {PetInfoCard} from "./components/petInfoCard/PetInfoCard";
import {PetCreationCard} from "./components/petCreationCard/PetCreationCard";
import {PetEditCard} from "./components/petEditCard/PetEditCard";

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
        setIsPetInfoCardOpen(true);
    };

    let content = [<AddPetItem onClick={()=>setIsPetCreationCardOpen(true)}/>];
    if(pets.isSuccess && pets.data && pets.data.length > 0){
        content = [...content,  pets.data.map((pet) => <PetItem
            key = {pet.id}
            pet={pet}
            isActive={false}
            onClick={() => handlePetItemClick(pet)}/>)];
    }



    const [isPetInfoCardOpen, setIsPetInfoCardOpen] = useState(false);
    const [isPetCreationCardOpen, setIsPetCreationCardOpen] = useState(false);
    const [isPetEditCardOpen, setIsPetEditCardOpen] = useState(false);

    const handleEdit = (pet) =>{
        setIsPetEditCardOpen(true)
        setIsPetInfoCardOpen(false)
    }

    return(
        pets.isSuccess && pets.data && pets.data.length > 0 ?
            <div className={styles.pets}>
                <div className={styles.header}>
                    Список питомцев
                </div>
                <div className={styles.petList}>
                    {content}
                </div>

                <Modal isOpen={isPetInfoCardOpen} onClose={() => setIsPetInfoCardOpen(false)}>
                   <PetInfoCard
                       onEdit={()=>handleEdit(currentPet)}
                       onClose={() => setIsPetInfoCardOpen(false)}
                       pet={currentPet}/>
                </Modal>
                <Modal isOpen={isPetCreationCardOpen} onClose={()=>setIsPetCreationCardOpen(false)}>
                    <PetCreationCard onClose={() => setIsPetCreationCardOpen(false)} />
                </Modal>
                <Modal isOpen={isPetEditCardOpen} onClose={()=>setIsPetEditCardOpen(false)}>
                    <PetEditCard pet={currentPet} onClose={() => setIsPetEditCardOpen(false)} />
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

