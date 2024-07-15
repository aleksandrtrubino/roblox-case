import styles from './AddPetCardItem.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


export const AddPetCardButton = ({onClick}) =>{

    return(
        <div className={styles.main} onClick={onClick}>
            <FontAwesomeIcon className={styles.button} icon={faPlus}/>
        </div>
    )
}