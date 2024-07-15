
import styles from './PetCards.module.scss'
import {useEffect, useState} from "react";
import {useGetPetCardsQuery} from "../../api/petCardApi";
import {AddPetCardButton} from "./components/addPetCardButton/AddPetCardButton";
import {PetCardItem} from "./components/petCard/PetCardItem";
import Modal from "../../common/containers/modal/Modal";
import {CreatePetCardItem} from "./components/createPetCardItem/CreatePetCardItem";
import {DeletePetCardItem} from "./components/deletePetCardItem/DeletePetCardItem";


export const PetCards = () => {

    const petCards = useGetPetCardsQuery();
    const [currentPetCard, setCurrentPetCard] = useState()

    useEffect(() => {
        if (petCards.isSuccess && petCards.data && petCards.data.length > 0) {
            setCurrentPetCard(petCards.data[0]);
        }
    }, [petCards.isSuccess, petCards.data]);

    const handlePetCardItemClick = (pet) => {
        setCurrentPetCard(pet);
        setIsDeletePetCardOpen(true);
    };

    let content = [<AddPetCardButton onClick={()=>setIsCreatePetCardOpen(true)}/>];
    if(petCards.isSuccess && petCards.data && petCards.data.length > 0){
        content = [...content, petCards.data.map((petCard) => <PetCardItem
            key = {petCard.id}
            petCard={petCard}
            isActive={false}
            onClick={() => handlePetCardItemClick(petCard)}/>)];
    }


    const [isDeletePetCardOpen, setIsDeletePetCardOpen] = useState(false);
    const [isCreatePetCardOpen, setIsCreatePetCardOpen] = useState(false);
    const [isEditPetCardOpen, setIsEditPetCardOpen] = useState(false);

    const handleEdit = () =>{
        setIsEditPetCardOpen(true)
        setIsDeletePetCardOpen(false)
    }

    return(
        petCards.isSuccess && petCards.data && petCards.data.length > 0 ?
            <div className={styles.petCards}>
                <div className={styles.header}>
                    Карточки
                </div>
                <div className={styles.petList}>
                    {content}
                </div>
                <Modal
                    isOpen={isCreatePetCardOpen}
                    onClose={() => setIsCreatePetCardOpen(false)}>
                    <CreatePetCardItem onClose={() => setIsCreatePetCardOpen(false)}/>
                </Modal>
                <Modal
                    isOpen={isDeletePetCardOpen}
                    onClose={()=> setIsDeletePetCardOpen(false)}>
                    <DeletePetCardItem
                        petCard={currentPetCard}
                        onClose={() => setIsDeletePetCardOpen(false)}/>
                </Modal>
            </div>

            :
            petCards.isLoading ?
                'loading..'
                :
                petCards.isError ?
                    'error'
                    :
                    'pizdec'
    )
}