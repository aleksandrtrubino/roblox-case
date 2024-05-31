import { NavLink } from "react-router-dom"
import styles from "./profile.module.scss"
import profileLogotype from '../../../../../assets/images/profileLogotype.png'

export const Profile = () => {
  return (
    <NavLink to='/profile' className={styles.profile}>
      <img className={styles.profile_image} src={profileLogotype} alt="" />
    </NavLink>
  )
}
