import React, {useState} from 'react';
import { Bonus } from './components/bonus/Bonus';
import styles from './home.module.scss';
import {useGetBoxesQuery} from "../../api/boxesApi";
import {BoxCard} from "./components/boxCard/BoxCard";
import Modal from "../../common/containers/modal/Modal";
import {BoxInfo} from "./components/boxInfo/BoxInfo";
import {BoxRoulette} from "./components/boxRoulette/BoxRoulette";

export const Home = () => {


  const boxes = useGetBoxesQuery()

    const handleClick = (box) => {
        setCurrentBox(box);
        setBoxInfoOpen(true);
    }

  let content;
  if(boxes.isSuccess && boxes.data && boxes.data.length > 0){
    content = boxes.data.map((box) => <BoxCard
        key = {box.id}
        box = {box}
        onClick = {handleClick}/>);
  }

  const [currentBox, setCurrentBox] = useState();
  const [isBoxInfoOpen, setBoxInfoOpen] = useState(false);
  const [isBoxRouletteOpen, setBoxRouletteOpen] = useState(false);


  return (
    <div className={styles.main} >
      <Bonus />
      <div className={styles.boxWrapper}>
        {content}
      </div>
        <Modal isOpen={isBoxInfoOpen} onClose={()=> setBoxInfoOpen(false)}>
            <BoxInfo box={currentBox} onClick={()=>{
                setBoxInfoOpen(false);
                setBoxRouletteOpen(true);
            }}/>

        </Modal>
        <Modal isOpen={isBoxRouletteOpen} onClose={()=>{
            setBoxRouletteOpen(false);
            setBoxInfoOpen(true);
        }}>
            <BoxRoulette box={currentBox} onClose={()=>{
                setBoxRouletteOpen(false);
                setBoxInfoOpen(false);
            }} />
        </Modal>
    </div>
  );
};
