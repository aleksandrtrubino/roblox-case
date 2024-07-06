import React from "react";
import { Link } from "react-router-dom";
import styles from './header.scss';
//import styles from './header.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Logotype } from '../../components/logotype/Logotype';
import {faSignIn, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import login from "../../../pages/login/Login";
import register from "../../../pages/Register/Register";


const AuthHeader = () => {
    return (
        <header className="header">
            {/*<Link className="header__logo-wrapper" to="/catalog">*/}
            {/*    <img*/}
            {/*        className="header__logo-image"*/}
            {/*        src={"/images/kion-logo.png"}*/}
            {/*        alt="site logo"*/}
            {/*    />*/}
            {/*    <div className='header__logo-text'>Маркет</div>*/}
            {/*</Link>*/}
            {/*<Logotype/>*/}

            <div className="header__logo-wrapper">
                <Logotype/>

                {/* Добавление счетчика пользователей на сайте */}
                {/* <Online className={styles.header_online}/> */}
            </div>

            <Link className="header__link" to= "./login" >
                <FontAwesomeIcon className='header__link-icon' icon={faSignIn}/>
                <span className='header__link-name'>Вход</span>

            </Link>
            <Link className="header__link" to="./register">
                <FontAwesomeIcon className='header__link-icon' icon={faUserPlus}/>
                <span className='header__link-name'>Регистрация</span>
            </Link>
        </header>
    );
};

export default AuthHeader;
