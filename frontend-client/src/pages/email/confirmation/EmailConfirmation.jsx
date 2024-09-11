import React, { useEffect } from 'react';
import styles from './EmailConfirmation.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '../../../api/emailApi';

const EmailConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [confirmEmail, { isLoading, isSuccess, isError }] = useConfirmEmailMutation();

    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (token) {
            confirmEmail(token).catch((error) => {
                console.error('Error confirming email', error);
            });
        }
    }, [token, confirmEmail]);

    const handleLoginRedirect = () => {
        navigate('/login'); // Замените на нужный путь для входа
    };

    const renderMessage = () => {
        if (isLoading) {
            return (
                <>
                    <h1 className={styles.header}>Подтверждение почты...</h1>
                    <p className={styles.message}>Пожалуйста, подождите. Мы подтверждаем вашу электронную почту.</p>
                </>
            );
        } else if (isSuccess) {
            return (
                <>
                    <h1 className={styles.header}>Почта подтверждена</h1>
                    <p className={styles.message}>Нажмите на кнопку ниже, чтобы войти в аккаунт.</p>
                    <button className={styles.button} onClick={handleLoginRedirect}>
                        Войти в аккаунт
                    </button>
                </>
            );
        } else if (isError) {
            return (
                <>
                    <h1 className={styles.header}>Ошибка подтверждения</h1>
                    <p className={styles.errorMessage}>
                        Не удалось подтвердить электронную почту. Попробуйте еще раз.
                    </p>
                </>
            );
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <div className={styles.messageBox}>
                {renderMessage()}
            </div>
        </div>
    );
};

export default EmailConfirmation;
