import { NavLink } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faUser} from "@fortawesome/free-solid-svg-icons";
import styles from "./profile.module.scss"
import profileLogotype from '../../../../../assets/images/profileLogotype.png'

export const ProfileIcon = () => {
  return (
    <NavLink to='/profile' className={styles.profile}>
      {/*<img className={styles.profile_image} src={profileLogotype} alt="" />*/}
        <FontAwesomeIcon className={styles.profile_icon} icon={faArchive} />
        <span className={styles.text}>Инвентарь</span>
    </NavLink>
  )
}
