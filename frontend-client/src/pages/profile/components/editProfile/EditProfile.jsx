import React, {useEffect, useState} from "react";
import styles from "./EditProfile.module.scss";
import { useNavigate } from "react-router-dom";
import {useEditUserMeMutation} from "../../../../api/userApi";
import {useRegisterMutation} from "../../../../api/authApi"; // Замена на мутацию для обновления профиля

const NAME_REGEX = /^[a-zA-Z0-9]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const EditProfile = ({ onClose, user }) => {

    const [nickname, setNickname] = useState(user.nickname);
    const [validMiddleName, setValidMiddleName] = useState(true);

    const [email, setEmail] = useState(user.email);
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);

    const [matchingPassword, setMatchingPassword] = useState("");
    const [validMatchingPassword, setValidMatchingPassword] = useState(true);

    const [contactLink, setContactLink] = useState(user.contact.link);

    const [contactTypeId, setContactTypeId] = useState(user.contact.type.id);

    useEffect(() => {
        if(contactTypeId === user.contact.type.id){
            setContactLink(user.contact.link)
        }
    }, [contactTypeId]);

    const contactButtonById = (id) => {
        switch (id) {
            case 1:
                return(
                    <button type="button" className={styles.socials_button + ' ' + (contactTypeId === 1 ? styles.socials_button_active : '')} onClick={()=>{setContactTypeId(1); setContactLink("")}}>
                        <svg
                            className={styles.socials_icon}
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" />
                        </svg>
                    </button>
                )
                break;
            case 2:
                return(
                    <button type="button" className={styles.socials_button + ' ' + (contactTypeId === 2 ? styles.socials_button_active : '')} onClick={()=>{setContactTypeId(2); setContactLink("")}}>
                        <svg
                            className={styles.socials_icon}
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.992 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.050 0.005 0.109 0.005 0.168 0 1.523-1.191 2.768-2.693 2.854l-0.008 0zM11.026 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.048 0.005 0.104 0.005 0.161 0 1.525-1.19 2.771-2.692 2.862l-0.008 0zM26.393 6.465c-1.763-0.832-3.811-1.49-5.955-1.871l-0.149-0.022c-0.005-0.001-0.011-0.002-0.017-0.002-0.035 0-0.065 0.019-0.081 0.047l-0 0c-0.234 0.411-0.488 0.924-0.717 1.45l-0.043 0.111c-1.030-0.165-2.218-0.259-3.428-0.259s-2.398 0.094-3.557 0.275l0.129-0.017c-0.27-0.63-0.528-1.142-0.813-1.638l0.041 0.077c-0.017-0.029-0.048-0.047-0.083-0.047-0.005 0-0.011 0-0.016 0.001l0.001-0c-2.293 0.403-4.342 1.060-6.256 1.957l0.151-0.064c-0.017 0.007-0.031 0.019-0.040 0.034l-0 0c-2.854 4.041-4.562 9.069-4.562 14.496 0 0.907 0.048 1.802 0.141 2.684l-0.009-0.11c0.003 0.029 0.018 0.053 0.039 0.070l0 0c2.14 1.601 4.628 2.891 7.313 3.738l0.176 0.048c0.008 0.003 0.018 0.004 0.028 0.004 0.032 0 0.060-0.015 0.077-0.038l0-0c0.535-0.72 1.044-1.536 1.485-2.392l0.047-0.1c0.006-0.012 0.010-0.027 0.010-0.043 0-0.041-0.026-0.075-0.062-0.089l-0.001-0c-0.912-0.352-1.683-0.727-2.417-1.157l0.077 0.042c-0.029-0.017-0.048-0.048-0.048-0.083 0-0.031 0.015-0.059 0.038-0.076l0-0c0.157-0.118 0.315-0.24 0.465-0.364 0.016-0.013 0.037-0.021 0.059-0.021 0.014 0 0.027 0.003 0.038 0.008l-0.001-0c2.208 1.061 4.8 1.681 7.536 1.681s5.329-0.62 7.643-1.727l-0.107 0.046c0.012-0.006 0.025-0.009 0.040-0.009 0.022 0 0.043 0.008 0.059 0.021l-0-0c0.15 0.124 0.307 0.248 0.466 0.365 0.023 0.018 0.038 0.046 0.038 0.077 0 0.035-0.019 0.065-0.046 0.082l-0 0c-0.661 0.395-1.432 0.769-2.235 1.078l-0.105 0.036c-0.036 0.014-0.062 0.049-0.062 0.089 0 0.016 0.004 0.031 0.011 0.044l-0-0.001c0.501 0.96 1.009 1.775 1.571 2.548l-0.040-0.057c0.017 0.024 0.046 0.040 0.077 0.040 0.010 0 0.020-0.002 0.029-0.004l-0.001 0c2.865-0.892 5.358-2.182 7.566-3.832l-0.065 0.047c0.022-0.016 0.036-0.041 0.039-0.069l0-0c0.087-0.784 0.136-1.694 0.136-2.615 0-5.415-1.712-10.43-4.623-14.534l0.052 0.078c-0.008-0.016-0.022-0.029-0.038-0.036l-0-0z"></path>
                        </svg>
                    </button>
                )
                break;
            case 3:
                return(
                    <button type="button" className={styles.socials_button + ' ' + (contactTypeId === 3 ? styles.socials_button_active : '')} onClick={()=>{setContactTypeId(3); setContactLink("")}}>
                        <svg
                            className={styles.socials_icon}
                            viewBox="-2.5 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.563 15.75c-0.5-0.188-0.5-0.906-0.531-1.406-0.125-1.781 0.5-4.5-0.25-5.656-0.531-0.688-3.094-0.625-4.656-0.531-0.438 0.063-0.969 0.156-1.344 0.344s-0.75 0.5-0.75 0.781c0 0.406 0.938 0.344 1.281 0.875 0.375 0.563 0.375 1.781 0.375 2.781 0 1.156-0.188 2.688-0.656 2.75-0.719 0.031-1.125-0.688-1.5-1.219-0.75-1.031-1.5-2.313-2.063-3.563-0.281-0.656-0.438-1.375-0.844-1.656-0.625-0.438-1.75-0.469-2.844-0.438-1 0.031-2.438-0.094-2.719 0.5-0.219 0.656 0.25 1.281 0.5 1.813 1.281 2.781 2.656 5.219 4.344 7.531 1.563 2.156 3.031 3.875 5.906 4.781 0.813 0.25 4.375 0.969 5.094 0 0.25-0.375 0.188-1.219 0.313-1.844s0.281-1.25 0.875-1.281c0.5-0.031 0.781 0.406 1.094 0.719 0.344 0.344 0.625 0.625 0.875 0.938 0.594 0.594 1.219 1.406 1.969 1.719 1.031 0.438 2.625 0.313 4.125 0.25 1.219-0.031 2.094-0.281 2.188-1 0.063-0.563-0.563-1.375-0.938-1.844-0.938-1.156-1.375-1.5-2.438-2.563-0.469-0.469-1.063-0.969-1.063-1.531-0.031-0.344 0.25-0.656 0.5-1 1.094-1.625 2.188-2.781 3.188-4.469 0.281-0.5 0.938-1.656 0.688-2.219-0.281-0.625-1.844-0.438-2.813-0.438-1.25 0-2.875-0.094-3.188 0.156-0.594 0.406-0.844 1.063-1.125 1.688-0.625 1.438-1.469 2.906-2.344 4-0.313 0.375-0.906 1.156-1.25 1.031z"></path>
                        </svg>
                    </button>
                )
                break;
            case 4:
                return(
                    <button type="button" className={styles.socials_button + ' ' + (contactTypeId === 4 ? styles.socials_button_active : '')} onClick={()=>{setContactTypeId(4); setContactLink("")}}>
                        <svg
                            className={styles.socials_icon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                    </button>
                )
                break;
            default:
                console.log("Invalid contact id");
        }
    };

    const contactButtonsList = () => {
        const buttons = [];

        for (let id = 1; id <= 4; id++) {
            buttons.push(contactButtonById(id));
        }

        return (
            <div className={styles.socials_icons}>
                {buttons.map(button => button)} {/* Рендерим массив кнопок */}
            </div>
        );
    };

    const nameByContactTypeId = (id) =>{
        switch (id) {
            case 1:
                return "Ссылка на Telegram";
                break;
            case 2:
                return "Ссылка на Discord";
                break;
            case 3:
                return "Ссылка на VK";
                break;
            case 4:
                return "Номер WhatsApp";
                break;
            default:
                console.log("Invalid contact id");
        }
    }



    const [editProfile] = useEditUserMeMutation();
    const navigate = useNavigate();

    const validFields = () => {
        const isValidMiddleName = NAME_REGEX.test(nickname);
        const isValidEmail = EMAIL_REGEX.test(email);
        const isValidPassword = PASSWORD_REGEX.test(password) || password === '';
        const isValidMatchingPassword = password === matchingPassword || (password === "" && matchingPassword === "");

        setValidMiddleName(isValidMiddleName);
        setValidEmail(isValidEmail);
        setValidPassword(isValidPassword);
        setValidMatchingPassword(isValidMatchingPassword);

        return isValidMiddleName && isValidEmail && isValidPassword && isValidMatchingPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validFields()) {
            try {
                // Создаем объект с необходимыми полями
                const profileData = {
                    nickname: nickname,
                    email: email,
                    contactTypeId: contactTypeId,
                    contactLink: contactLink
                };

                // Добавляем пароль только если он не пустой
                if (password) {
                    profileData.password = password;
                }

                const response = await editProfile({userDto: profileData}).unwrap();
                if(email !== user.email)
                    navigate('/email-message', { state: email });
                else onClose();
            } catch (error) {
                console.log(error);
            }

        }
        else{
            alert("Invalid fields")
        }
    };


    return (
        <>
            <div className={styles.wrapper}>
                <section className={styles.section}>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div className={styles.registerGrid}>
                            <div className={styles.leftColumn}>
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
                                        onChange={(e) => setNickname(e.target.value)}
                                        value={nickname}
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
                                            Пожалуйста, используйте латинские символы и цифры.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.inputWrapper}>
                                    {contactButtonsList()}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.label} htmlFor="contact">
                                            Электронная почта:
                                        </label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            id="contact"
                                            placeholder={`${nameByContactTypeId(contactTypeId)}`}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                setContactLink(e.target.value);
                                            }}
                                            value={contactLink}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightColumn}>
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
                                        placeholder="Новый пароль"
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
                            </div>
                        </div>

                        <button className={styles.button} type="submit" >Сохранить</button>
                    </form>
                </section>
            </div>
        </>
    );
};