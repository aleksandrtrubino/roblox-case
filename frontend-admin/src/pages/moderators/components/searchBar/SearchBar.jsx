import styles from './SearchBar.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({search, setSearch, submitSearch}) =>{

    return(
        <form className={styles.main}>
            <input className={styles.input}
                    placeholder="Найти модератора по никнейму"
                   type="text"
                   onChange={(e)=>{setSearch(e.target.value)}}
                   value={search}
            />
            <div className={styles.iconWrapper} onClick={submitSearch}>
                <FontAwesomeIcon className={styles.icon} icon={faSearch} />
            </div>
        </form>
    )
}