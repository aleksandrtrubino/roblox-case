import React, {useState} from 'react';
import styles from './Promocodes.module.scss';
import {useGetAllPromoCodesQuery} from "../../api/promoCodeApi";
import {PromoCodeItem} from "./components/promoCodeItem/PromoCodeItem";
import Modal from "../../common/containers/modal/Modal";
import {CreatePromoCode} from "./components/createPromoCode/CreatePromoCode";
const pageNumbers = [1, 2, 3, 4, 5];

const Promocodes = () => {

  const [isCreatePromoCodeOpen, setCreatePromoCodeOpen] = useState(false);

  const promocodes = useGetAllPromoCodesQuery();
  let content;
  if(promocodes.isSuccess && promocodes.data && promocodes.data.length > 0){{
    content = promocodes.data.map((promoCode)=>
            <PromoCodeItem
                key={promoCode.id}
                promoCode={promoCode}
            />
    )
  }}


  return (
    <div className={styles.main}>
      <div className={styles.header}>
        Промокоды
        <button className={styles.createButton} onClick={()=>setCreatePromoCodeOpen(true)}>Создать</button>
      </div>
      {content}
      <Modal isOpen={isCreatePromoCodeOpen} onClose={()=>setCreatePromoCodeOpen(false)}>
        <CreatePromoCode onClose={()=>setCreatePromoCodeOpen(false)} />
      </Modal>
    </div>
  );
};

export default Promocodes;
