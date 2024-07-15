import styles from './DeletePetCardItem.module.scss'
import {PetCardItem} from "../petCard/PetCardItem";
import {useDeletePetCardMutation} from "../../../../api/petCardApi";

export const DeletePetCardItem = ({petCard, onClose}) =>{

    const [deletePetCard] = useDeletePetCardMutation();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const petCardId = petCard.id;
            const response = deletePetCard({petCardId}).unwrap();
            onClose()
        }
        catch (error){
            console.log("Error deleting petCard", e)
        }
    }

    return(
        <form className={styles.main} onSubmit={handleSubmit}>
            <PetCardItem className={styles.petCard} petCard={petCard} isActive={false} onClick={()=>{}}/>
            <button className={styles.deleteButton}>Удалить</button>
        </form>
    )
}