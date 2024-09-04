

import styles from './Inventory.module.scss';
import {useGetInventoryMeQuery} from "../../../../api/inventoryApi";
import {BoxCard} from "../../../home/components/boxCard/BoxCard";
import React, {useState} from "react";
import {MiniPetCard} from "../miniPetCard/MiniPetCard";
import Modal from "../../../../common/containers/modal/Modal";
import {ItemInfo} from "../itemInfo/ItemInfo";

export const Inventory = () => {


  const [isPetCardOpen, setPetCardOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const inventory = useGetInventoryMeQuery();

  const handleClick = (item) =>{
    setCurrentItem(item);
    setPetCardOpen(true);
  }

  let content;
  if(inventory.isSuccess && inventory.data.items && inventory.data.items.length > 0){
    console.log("Rendering petCards:", inventory.data.items.length);
    content = inventory.data.items.map((item) => <MiniPetCard
        key = {item.id}
        petCard = {item.petCard}
        onClick={() => handleClick(item)}
        className={styles.petCard}
        />);
  }



  return (
<div className={styles.main}>
  {content}
  <Modal isOpen={isPetCardOpen} onClose={()=>setPetCardOpen(false)}>
    <ItemInfo item={currentItem} onClose={()=>setPetCardOpen(false)}/>
  </Modal>
</div>
  );
};
