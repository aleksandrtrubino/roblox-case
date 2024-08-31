import React, {useEffect} from 'react';
import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Очистка эффекта при размонтировании компонента
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            {children}
        </div>
    );
};

export default Modal;