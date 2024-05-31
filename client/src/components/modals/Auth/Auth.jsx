import React from 'react';

import { Close } from '../../common/Close/Close';
import styles from './auth.module.scss';
import { Logotype } from '../../common/Logotype/Logotype';
import { NavLink } from 'react-router-dom';



export const Auth = () => {
  const [auth, setAuth] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  return (
    <div className={styles.auth}>
      <div className={styles.auth_wrapper}>
        <div className={styles.close}>
          <button className={styles.close_button}>
            <svg
              className={styles.close_icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
              />
            </svg>
          </button>
        </div>
        <div className={styles.left}>
          <Logotype />
        </div>
        <div className={styles.right}>
          <div className={styles.former}>
            <div className={styles.header}>
              <button
                className={`${styles.button} ${styles.button_authorization}`}>
                Авторизация
              </button>
              <button
                className={`${styles.button} ${styles.button_registration}`}>
                Регистрация
              </button>
            </div>
            <div className={styles.body}>
              {auth ? (
                <div className={styles.former}>
                  <div className={styles.forms}>
                    <input
                      className={styles.forms_mail}
                      type="email"
                      placeholder="Почта"
                    />
                    <input
                      className={styles.forms_password}
                      type="password"
                      placeholder="Пароль"
                    />
                  </div>
                  <button className={styles.forms_button}>Авторизоваться</button>
                  <div className={styles.forms_forgot}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Забыли пароль?</span>
                  </div>
                </div>
              ) : (
                <div className={styles.former}>
                  <div className={styles.forms}>
                    <input className={styles.forms_nickname} type="text" placeholder="Никнейм" />
                    <input className={styles.forms_mail} type="email" placeholder="Почта" />
                    <input className={styles.forms_password} type="password" placeholder="Пароль" />
                  </div>
                  <button className={styles.forms_button}>Зарегистрироваться</button>
                </div>
              )}
            </div>
            <div className={styles.description}>
              Прочел и согласен с{' '}
              <NavLink className={styles.description_links} to="/privacy">
                Политика конфиденциальности
              </NavLink>{' '}
              и{' '}
              <NavLink className={styles.description_links} to="/agreement">
                Пользовательское соглашение
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
