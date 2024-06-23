import React from 'react'

import styles from './Auth.module.scss';
import showPassIcon from '../../assets/images/showPassIcon.svg';

const Auth = () => {
  // const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPass, setShowPass] = React.useState(false)
  const [isLoggedIn, SetIsLoggedIn] = React.useState(false)

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleInputChange = (event) => {
    // if(event.target.name === 'username') {
    //   setUsername(event.target.value)
    // } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    // }
  }

  if(isLoggedIn) {
    return null
  }

  return (
    <div className={styles.auth}>
      <div className={styles.logotype}>
        Petcase
      </div>
      <p></p>
      <div className={styles.form}>

        <input name='username' className={`${styles.form__input} ${styles.form__login}`} type="text" placeholder='Ваш логин'/>
        <span className={styles.form__pass}>
          <input name='password' onChange={handleInputChange} className={styles.form__input} type={showPass ? 'text' : 'password'} placeholder='Ваш пароль'/>
          {password.length> 0 && (<img onClick={handleShowPass} src={showPassIcon} alt="" />)}
        </span>
        <button className={styles.form__complete}>Авторизоваться</button>
      </div>
    </div>
  )
}

export default Auth;
