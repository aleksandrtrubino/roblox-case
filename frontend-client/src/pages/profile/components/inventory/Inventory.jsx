import { History } from '../history/History';
import { Items } from '../items/Items';

import styles from './Inventory.module.scss';
import {useGetInventoryMeQuery} from "../../../../api/inventoryApi";
import {BoxCard} from "../../../home/components/boxCard/BoxCard";
import React from "react";
import {MiniPetCard} from "../miniPetCard/MiniPetCard";

export const Inventory = () => {

  const inventory = useGetInventoryMeQuery();

  let content;
  if(inventory.isSuccess && inventory.data.petCards && inventory.data.petCards.length > 0){
    content = inventory.data.petCards.map((petCard) => <MiniPetCard
        key = {petCard.id}
        petCard = {petCard}
        />);
  }


  return (
<div className={styles.main}>
  {content}
</div>
  );
};
