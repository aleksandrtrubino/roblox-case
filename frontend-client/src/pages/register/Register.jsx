import React from "react";
import { useState, useEffect } from "react";
import styles from "./RegisterForm.module.scss";
//import {useRegisterMutation} from "../authApi";
import {useNavigate} from "react-router-dom";


const NAME_REGEX = /^([а-яёА-ЯЁ]){1,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

// export const Register = () => {
//     React.useLayoutEffect(() => {
//         window.scrollTo(0, 0);
//     });

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(true);

    const [middleName, setMiddleName] = useState("");
    const [validMiddleName, setValidMiddleName] = useState(true);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(true);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);

    const [matchingPassword, setMatchingPassword] = useState("");
    const [validMatchingPassword, setValidMatchingPassword] = useState(true);

    //const [register] = useRegisterMutation();
    const navigate = useNavigate();

    useEffect(() => {
        setValidLastName(
            NAME_REGEX.test(lastName) || lastName === "" ? true : false
        );
    }, [lastName]);

    useEffect(() => {
        setValidFirstName(
            NAME_REGEX.test(firstName) || firstName === "" ? true : false
        );
    }, [firstName]);

    useEffect(() => {
        setValidMiddleName(
            NAME_REGEX.test(middleName) || middleName === "" ? true : false
        );
    }, [middleName]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email) || email === "" ? true : false);
    }, [email]);

    useEffect(() => {
        setValidPassword(
            PASSWORD_REGEX.test(password) || password === "" ? true : false
        );
    }, [password]);

    useEffect(() => {
        setValidMatchingPassword(
            matchingPassword === "" || password === matchingPassword ? true : false
        );
    }, [password, matchingPassword]);

    const validFields = () =>{
        return validEmail
            && validPassword
            && validMatchingPassword
            && validFirstName
            && validMiddleName
            &&validLastName;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (lastName === "") {
            setValidLastName(false);
        }
        if (firstName === "") {
            setValidFirstName(false);
        }
        if (middleName === "") {
            setValidMiddleName(false);
        }
        if (email === "") {
            setValidEmail(false);
        }
        if (password === "") {
            setValidPassword(false);
        }
        if (matchingPassword === "") {
            setValidMatchingPassword(false);
        }

        // if(validFields()){
        //     try{
        //         const response = await register({
        //             email: email,
        //             password: password,
        //             firstName: firstName,
        //             middleName: middleName,
        //             lastName: lastName}).unwrap();
        //         navigate('/login')
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // }
    };

    return (
        <>
            <div className={styles.register__wrapper}>
                <section className={styles.register__section}>
                    <form className={styles.register__form} onSubmit={handleSubmit}>
                        <h1 className={styles.register__header}>Регистрация</h1>
                        <div className={styles.register__inputWrapper}>
                            <label className={styles.register__label} htmlFor="nickname">
                                Никнэйм:
                            </label>
                            <input
                                className={
                                    validMiddleName
                                        ? middleName !== ""
                                            ? `${styles.register__input} ${styles.register__inputBoxShadowGreen}`
                                            : styles.register__input
                                        : `${styles.register__input} ${styles.register__inputBoxShadowRed}`
                                }
                                type="text"
                                id="nickname"
                                placeholder="Никнэйм"
                                autoComplete="off"
                                onChange={(e) => setMiddleName(e.target.value)}
                                value={middleName}
                            />
                            <div
                                className={
                                    !validMiddleName
                                        ? styles.register__errorMessage
                                        : `${styles.register__errorMessage} ${styles.register__errorMessageHidden}`
                                }
                                id="middle-name"
                            >
                                <p>
                                    Некорректный формат. <br />
                                    Пожалуйста, используйте кириллические символы.
                                </p>
                            </div>
                        </div>

                        <div className={styles.register__inputWrapper}>
                            <label className={styles.register__label} htmlFor="email">
                                Электронная почта:
                            </label>
                            <input
                                className={
                                    validEmail
                                        ? email !== ""
                                            ? `${styles.register__input} ${styles.register__inputBoxShadowGreen}`
                                            : styles.register__input
                                        : `${styles.register__input} ${styles.register__inputBoxShadowRed}`
                                }
                                type="text"
                                id="email"
                                placeholder="Электронная почта"
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setValidEmail(true);
                                }}
                                value={email}
                            />
                            <div
                                className={
                                    !validEmail
                                        ? styles.register__errorMessage
                                        : `${styles.register__errorMessage} ${styles.register__errorMessageHidden}`
                                }
                                id="email"
                            >
                                <p>Введите корректный адрес электронной почты.</p>
                            </div>
                        </div>

                        <div className={styles.register__inputWrapper}>
                            <label className={styles.register__label} htmlFor="password">
                                Пароль:
                            </label>
                            <input
                                className={
                                    validPassword
                                        ? password !== ""
                                            ? `${styles.register__input} ${styles.register__inputBoxShadowGreen}`
                                            : styles.register__input
                                        : `${styles.register__input} ${styles.register__inputBoxShadowRed}`
                                }
                                type="password"
                                id="password"
                                placeholder="Пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div
                                className={
                                    !validPassword
                                        ? styles.register__errorMessage
                                        : `${styles.register__errorMessage} ${styles.register__errorMessageHidden}`
                                }
                                id="password"
                            >
                                <p>
                                    Пароль должен содержать не менее 8 символов
                                    <br /> и включать в себя цифры и латинские буквы. <br />
                                    Допускаются буквы верхнего регистра и специальные символы.
                                </p>
                            </div>
                        </div>

                        <div className={styles.register__inputWrapper}>
                            <label className={styles.register__label} htmlFor="matching-password">
                                Повторите пароль:
                            </label>
                            <input
                                className={
                                    validMatchingPassword
                                        ? matchingPassword !== ""
                                            ? `${styles.register__input} ${styles.register__inputBoxShadowGreen}`
                                            : styles.register__input
                                        : `${styles.register__input} ${styles.register__inputBoxShadowRed}`
                                }
                                type="password"
                                id="matching-password"
                                placeholder="Повторите пароль"
                                onChange={(e) => setMatchingPassword(e.target.value)}
                                value={matchingPassword}
                            />
                            <div
                                className={
                                    !validMatchingPassword
                                        ? styles.register__errorMessage
                                        : `${styles.register__errorMessage} ${styles.register__errorMessageHidden}`
                                }
                                id="matching-password"
                            >
                                <p>Пароли не совпадают.</p>
                            </div>
                        </div>

                        <button className={styles.register__button}>Создать аккаунт</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export {Register};
