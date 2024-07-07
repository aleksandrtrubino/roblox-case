import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import {Link, useLocation, useNavigate} from 'react-router-dom'


import styles from "./Login.module.scss";
import {useLoginMutation, useLogoutMutation} from "../../api/authApi";
import {logout, setToken} from "../../model/authSlice";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);


    const [login] = useLoginMutation()
    const [logoutMutation] = useLogoutMutation()

    const from = location.state?.from?.pathname || "/dashboard";

    const doLogout = async () =>{
        try{
            dispatch(logout());
            const response = await logoutMutation().unwrap();
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        doLogout()
    },[])

    const defaultPasswordMessage = (
        <span>
            Пароль должен содержать не менее 8 символов и включать в себя цифры и латинские буквы. Допускаются буквы верхнего регистра и специальные символы.
        </span>
    );

    const invalidPasswordMessage = (
        <span>
            Неправильный пароль
        </span>
    )

    const defaultEmailMessage = (
        <span>Введите корректный адрес электронной почты.</span>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidEmail(EMAIL_REGEX.test(email));
        setValidPassword(PASSWORD_REGEX.test(password));

        if (validEmail && validPassword) {
            try{
                console.log("Login: request is sent")
                const response = await login({email, password}).unwrap();
                const token = response?.token;
                console.log("token: "+ token)
                dispatch(setToken(token))
                navigate(from)
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
            <div className={styles.logotype}>
                Petcase.admin
            </div>
            <div className={styles.wrapper}>
                <section className={styles.section}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1 className={styles.header}>Вход</h1>

                        <div className={styles.inputWrapper}>
                            <label className={styles.label} htmlFor="email">
                                Электронная почта:
                            </label>
                            <input
                                className={styles.input}
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
                                        ? styles.errorMessage
                                        : styles.errorMessageHidden
                                }
                                id="email"
                            >
                                {defaultEmailMessage}
                            </div>
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.label} htmlFor="password">
                                Пароль:
                            </label>
                            <input
                                className={styles.input}
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
                                        ? styles.errorMessage
                                        : styles.errorMessageHidden
                                }
                                id="password"
                            >
                                {defaultPasswordMessage}
                            </div>
                        </div>

                        <button className={styles.button}>Войти</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export { Login };
