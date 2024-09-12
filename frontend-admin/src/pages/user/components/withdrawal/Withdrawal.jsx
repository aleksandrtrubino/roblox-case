import styles from './Withdrawal.module.scss'

export const Withdrawal = ({withdrawal}) =>{


    const propertyById = [
        (<></>),
        (<div className={styles.property + ' ' + styles.property_neon}>
            N
        </div>),
        (<div className={styles.property + ' ' + styles.property_megaNeon}>
            M
        </div>),
        (<div className={styles.property + ' ' + styles.property_flyable}>
            F
        </div>),
        (<div className={styles.property + ' ' + styles.property_rideable}>
            R
        </div>),
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return(
        <div className={styles.main}>
            <div className={styles.nameWrapper}>
                <span className={styles.name}>
            {withdrawal.petCard.pet.name}
                </span>
                <div className={styles.propertyList}>
                    {withdrawal.petCard.properties
                        .slice() // Создаем копию массива, чтобы не мутировать исходный массив
                        .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
                        .map((property) => propertyById[property.id])
                    }
                </div>
            </div>
            <div className={styles.createdAt}>
                {formatDate(withdrawal.createdAt)}
            </div>
        </div>
    )
}