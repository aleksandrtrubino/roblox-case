import React from "react";
import { useState, useEffect } from "react";
import styles from "./register.module.scss";
// import { useRegisterMutation } from "../authApi";
import { useNavigate } from "react-router-dom";
import {useRegisterMutation} from "../../api/authApi";

const NAME_REGEX = /^([а-яёА-ЯЁ]){1,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const validFields = () => {
        const isValidFirstName = NAME_REGEX.test(firstName);
        const isValidMiddleName = NAME_REGEX.test(middleName);
        const isValidLastName = NAME_REGEX.test(lastName);
        const isValidEmail = EMAIL_REGEX.test(email);
        const isValidPassword = PASSWORD_REGEX.test(password);
        const isValidMatchingPassword = password === matchingPassword;

        setValidFirstName(isValidFirstName);
        setValidMiddleName(isValidMiddleName);
        setValidLastName(isValidLastName);
        setValidEmail(isValidEmail);
        setValidPassword(isValidPassword);
        setValidMatchingPassword(isValidMatchingPassword);

        return isValidFirstName && isValidMiddleName && isValidLastName && isValidEmail && isValidPassword && isValidMatchingPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (validFields()) {
            try {
                const response = await register({
                    nickname: middleName,
                    email: email,
                    password: password
                }).unwrap();
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        // }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <section className={styles.section}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1 className={styles.header}>Регистрация</h1>

                        <div className={styles.inputWrapper}>
                            <label className={styles.label} htmlFor="nickname">
                                Никнэйм:
                            </label>
                            <input
                                className={styles.input}
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
                                        ? styles.errorMessage
                                        : `${styles.errorMessage} ${styles.errorMessageHidden}`
                                }
                                id="middle-name"
                            >
                                <p>
                                    Некорректный формат. <br />
                                    Пожалуйста, используйте кириллические символы.
                                </p>
                            </div>
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.label} htmlFor="email">
                                Электронная почта:
                            </label>
                            <input
                                className={styles.input}
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
                                        ? styles.errorMessage
                                        : `${styles.errorMessage} ${styles.errorMessageHidden}`
                                }
                                id="email"
                            >
                                <p>Введите корректный адрес электронной почты.</p>
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
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div
                                className={
                                    !validPassword
                                        ? styles.errorMessage
                                        : `${styles.errorMessage} ${styles.errorMessageHidden}`
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

                        <div className={styles.inputWrapper}>
                            <label className={styles.label} htmlFor="matching-password">
                                Повторите пароль:
                            </label>
                            <input
                                className={styles.input}
                                type="password"
                                id="matching-password"
                                placeholder="Повторите пароль"
                                onChange={(e) => setMatchingPassword(e.target.value)}
                                value={matchingPassword}
                            />
                            <div
                                className={
                                    !validMatchingPassword
                                        ? styles.errorMessage
                                        : `${styles.errorMessage} ${styles.errorMessageHidden}`
                                }
                                id="matching-password"
                            >
                                <p>Пароли не совпадают.</p>
                            </div>
                        </div>

                        <button className={styles.button}>Создать аккаунт</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export { Register };
