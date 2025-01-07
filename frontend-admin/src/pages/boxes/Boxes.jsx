import styles from './Boxes.module.scss'
import {useGetBoxesQuery} from "../../api/boxesApi";
import {BoxItem} from "./components/boxItem/BoxItem";
import Modal from "../../common/containers/modal/Modal";
import {CreateBox} from "./components/createBox/CreateBox";
import {useState} from "react";
import {EditBox} from "./components/editBox/EditBox";


export const Boxes = () =>{

    const boxes = useGetBoxesQuery()

    let content;
    if(boxes.isSuccess && boxes.data && boxes.data.length > 0){
        content = boxes.data.map((box) => <BoxItem
            key = {box.id}
            box = {box}/>);
    }


    const [isCreateBoxOpen, setCreateBoxOpen] = useState(false);

    return(
        boxes.isSuccess ?
        <div className={styles.main}>
            <div className={styles.header}>
                <p>Кейсы</p>
                <button className={styles.createButton} onClick={()=>setCreateBoxOpen(true)}>Создать</button>
            </div>
            <div className={styles.boxList}>
                {content}
            </div>
            <Modal isOpen={isCreateBoxOpen} onClose={()=>setCreateBoxOpen(false)}>
                <CreateBox onClose={()=>setCreateBoxOpen(false)}/>
            </Modal>

        </div>
        :
        boxes.isLoading ?
            'loading..'
            :
            boxes.isError ?
                'error'
                :
                'pizdec'
    )
}
