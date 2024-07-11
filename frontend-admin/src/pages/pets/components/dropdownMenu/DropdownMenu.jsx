import {useState} from "react";
import styles from './DropdownMenu.module.scss'

export const DropdownMenu = ({items, selectedItem, setSelectedItem}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return(
        <div className={styles.main}>
            <div onClick={()=>setIsOpen(!isOpen)} className={styles.header + ' ' + (!isOpen && styles.header_closed)}>
                {selectedItem.name}
                <div>&#9660;</div>
            </div>
            <div className={styles.dropdownContent}>
            {
                isOpen && items.map((item, index) =>(
                        <div
                            key={item.id}
                            className={styles.option}
                            onClick={() => handleItemClick(item)}>
                            {item.name}
                        </div>
                    ))
            }
            </div>
        </div>

    )
}