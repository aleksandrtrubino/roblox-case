import React, { useEffect } from 'react';
import styles from './EmailMessage.module.scss';
import { useLocation } from 'react-router-dom';
import { useSendEmailMutation } from '../../../api/emailApi';

const EmailMessage = () => {
    const location = useLocation();
    const [sendEmail, { isLoading, isError, isSuccess }] = useSendEmailMutation();
    const email = location.state;

    useEffect(() => {
        if (email && typeof email === 'string') {
            sendEmail(email)
                .unwrap()
                .catch((error) => {
                    console.error('Error sending email', error);
                });
        } else {
            console.error('Invalid email:', email);
        }
    }, [email, sendEmail]);

    const getMessage = () => {
        if (isLoading) {
            return (
                <>
                    <h1 className={styles.header}>
                        {"Отправка письма..."}
                    </h1>
                    <p className={styles.message}>
                        Пожалуйста, подождите, пока мы отправляем письмо на указанный адрес.
                    </p>
                </>
            );
        } else if (isSuccess) {
            return (
                <>
                    <h1 className={styles.header}>
                        {"Письмо отправлено на почту " + (email || '')}
                    </h1>
                    <p className={styles.message}>
                        Перейдите по ссылке в письме чтобы подтвердить электронную почту.
                    </p>
                </>
            );
        } else if (isError) {
            return (
                <>
                    <h1 className={styles.header}>
                        Что-то пошло не так
                    </h1>
                    <p className={styles.message}>
                        Не удалось отправить письмо подтверждения на почту. Пожалуйста, попробуйте еще раз позже.
                    </p>
                </>
            );
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <div className={styles.messageBox}>
                {getMessage()}
            </div>
        </div>
    );
};

export default EmailMessage;
