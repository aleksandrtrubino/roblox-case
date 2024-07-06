import React from "react";
import { useState, useEffect } from "react";
//import { useDispatch } from 'react-redux'
//import {useLoginMutation, useLogoutMutation} from "../../features/auth/api/authApi";
import { useNavigate } from 'react-router-dom'


//import {logout, setToken} from "../../features/auth/model/authSlice";

import styles from "./LoginForm.module.scss";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);


    //const [login] = useLoginMutation()
    //const [logoutMutation] = useLogoutMutation()

    // const doLogout = async () =>{
    //   try{
    //     dispatch(logout());
    //     const response = await logoutMutation().unwrap();
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
    // }

    // useEffect(()=> {
    //   doLogout()
    // },[])

    const defaultPasswordMessage = (
        <p>
            Пароль должен содержать не менее 8 символов
            <br /> и включать в себя цифры и латинские буквы. <br />
            Допускаются буквы верхнего регистра и специальные символы.
        </p>
    );

    const invalidPasswordMessage = (
        <p>
            Неправильный пароль
        </p>
    )

    const defaultEmailMessage = (
        <p>Введите корректный адрес электронной почты.</p>
    )


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email) || email === "" ? true : false);
    }, [email]);

    useEffect(() => {
        setValidPassword(
            PASSWORD_REGEX.test(password) || password === "" ? true : false
        );
    }, [password]);

    const validFields = () => {
        return validEmail && validPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            setValidEmail(false);
        }
        if (password === "") {
            setValidPassword(false);
        }

        if (validFields()) {
            try{
                // const response = await axios.post(
                //   LOGIN_URL,
                //   JSON.stringify({ email, password }),
                //   {
                //     headers: { "Content-Type": "application/json" },
                //     withCredentials: true,
                //   }
                // );
                try{
                    //dispatch(logout());
                    //const response = await logoutMutation().unwrap();
                }
                catch(error){
                    console.log(error)
                }
                console.log("Login: request is sent")
                //const response = await login({email, password}).unwrap();
                //console.log("token: "+ response?.token)
                navigate("/catalog")
            }
            catch (error){
                console.log(error);
                if(!error){
                    console.log("No server response")
                }
                else if(error?.response?.status === 404){
                    console.log("User with this email doesn't exist")
                }
                else if(error?.response?.status === 403){
                    console.log("Wrong password")
                }
            }



        }
    };

    return (
        <>
            <div className={styles.login__wrapper}>
                <section className={styles.login__section}>
                    <form className={styles.login__form} onSubmit={handleSubmit}>
                        <h1 className={styles.login__header}>Вход</h1>

                        <div className={styles.login__inputWrapper}>
                            <label className={styles.login__label} htmlFor="email">
                                Электронная почта:
                            </label>
                            <input
                                className={
                                    validEmail
                                        ? email !== ""
                                            ? `${styles.login__input} ${styles.login__inputBoxShadowGreen}`
                                            : styles.login__input
                                        : `${styles.login__input} ${styles.login__inputBoxShadowRed}`
                                }
                                type="text"
                                id="email"
                                placeholder="Электронная почта"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setValidEmail(true);
                                }}
                                value={email}
                            />
                            <div
                                className={
                                    !validEmail
                                        ? styles.login__errorMessage
                                        : styles.login__errorMessageHidden
                                }
                                id="email"
                            >
                                {defaultEmailMessage}
                            </div>
                        </div>

                        <div className={styles.login__inputWrapper}>
                            <label className={styles.login__label} htmlFor="password">
                                Пароль:
                            </label>
                            <input
                                className={
                                    validPassword
                                        ? password !== ""
                                            ? `${styles.login__input} ${styles.login__inputBoxShadowGreen}`
                                            : styles.login__input
                                        : `${styles.login__input} ${styles.login__inputBoxShadowRed}`
                                }
                                type="password"
                                id="password"
                                placeholder="Пароль"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div
                                className={
                                    !validPassword
                                        ? styles.login__errorMessage
                                        : styles.login__errorMessageHidden
                                }
                                id="password"
                            >
                                {defaultPasswordMessage}
                            </div>
                        </div>

                        <button className={styles.login__button}>Войти</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export { Login };
