

import styles from './Inventory.module.scss';
import React, {useState} from "react";
import {useGetInventoryByUserIdQuery} from "../../../../api/inventoryApi";
import {MiniPetCard} from "../miniPetCard/MiniPetCard";


export const Inventory = ({userId}) => {

  const inventory = useGetInventoryByUserIdQuery({userId});

  let content;
  if(inventory.isSuccess && inventory.data.items && inventory.data.items.length > 0){
    console.log("Rendering petCards:", inventory.data.items.length);
    content = inventory.data.items.map((item) => <MiniPetCard
        key = {item.id}
        petCard = {item.petCard}
        className={styles.petCard}
        />);
  }

  return (
<div className={styles.main}>
  {content}
</div>
  );
};
