import styles from './EditPromoCode.module.scss'
import {useState} from "react";
import {useUpdatePromoCodeMutation} from "../../../../api/promoCodeApi";

export const EditPromoCode = ({promoCode, onClose}) =>{

    const [code, setCode] = useState(promoCode.code);
    const [typeId, setTypeId] = useState(promoCode.type.id);
    const [number, setNumber] = useState(promoCode.number);
    const [usesLeft, setUsesLeft] = useState(promoCode.usesNumber);

    const [updatePromoCode] = useUpdatePromoCodeMutation();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await updatePromoCode({promoCodeId: promoCode.id, promoCodeDto: {code, typeId, number, usesLeft}})
            onClose()
        }
        catch (e){
            alert("Ошибка при создании промокода")
        }
    }

    return(
        <form className={styles.main} onSubmit={handleSubmit}>
            <div className={styles.fieldWrapper}>
                <div className={styles.name}>
                    Код:
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        type="text"
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.fieldWrapper}>
                <div className={styles.name}>
                    Тип:
                </div>
                <div className={styles.iconsWrapper}>
                    <button
                        type="button"
                        className={styles.icon + " " + (typeId === 1 ? styles.active : '')}
                        onClick={()=>setTypeId(1)}
                    >
                        Сумма
                    </button>
                    <button
                        type="button"
                        className={styles.icon + " " + (typeId === 2 ? styles.active : '')}
                        onClick={()=>setTypeId(2)}
                    >
                        Процент
                    </button>
                </div>
            </div>
            <div className={styles.fieldWrapper}>
                <div className={styles.name}>
                    {
                        typeId === 1 ?
                            "Сумма:"
                            :
                            "Процент:"
                    }
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        type="number"
                        value={number}
                        onChange={(e)=>setNumber(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.fieldWrapper}>
                <div className={styles.name}>
                    Использования:
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        type="number"
                        value={usesLeft}
                        onChange={(e)=>setUsesLeft(e.target.value)}
                    />
                </div>
            </div>
            <button className={styles.createButton}>
                Сохранить
            </button>
        </form>
    )
}