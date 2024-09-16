import React, {useState} from 'react';
import styles from './Moderators.module.scss';
import {useGetAllUsersQuery} from "../../api/userApi";
import {SearchBar} from "./components/searchBar/SearchBar";
import {useNavigate} from "react-router-dom";
import {CreateModerator} from "./components/createModerator/CreateModerator";
import Modal from "../../common/containers/modal/Modal";
import {EditModerator} from "./components/editModerator/EditModerator";


const Moderators = () => {
    const [selectedSearch, setSelectedSearch] = useState('');

    const users = useGetAllUsersQuery({search: selectedSearch, authorityId: 2});

    const [isCreateModeratorOpen, setCreateModeratorOpen] = useState(false);
    const [isEditModeratorOpen, setEditModeratorOpen] = useState(false);
    const [currentModerator, setCurrentModerator] = useState();
    const navigate = useNavigate();

    let content;
    if(users.isSuccess && users.data && users.data.length > 0){
        content = users.data.map((user)=>
            <div className={styles.user} onClick={()=>{setCurrentModerator(user); setEditModeratorOpen(true)}}>
                <div className={styles.user_icon}>
                    {user.nickname[0].toUpperCase()}
                </div>
                <div className={styles.user_nickname}>
                    {user.nickname}
                </div>
            </div>)
    }
    else{
        content = ''
    }


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                Модераторы
                <button
                    className={styles.createButton}
                    onClick={()=>setCreateModeratorOpen(true)}
                >
                    Добавить
                </button>
            </div>
            <SearchBar search={selectedSearch} setSearch={setSelectedSearch} submitSearch={()=>{}} />
            {content}
            <Modal isOpen={isCreateModeratorOpen} onClose={()=>setCreateModeratorOpen(false)}>
              <CreateModerator onClose={()=>setCreateModeratorOpen(false)} />
            </Modal>
            <Modal isOpen={isEditModeratorOpen} onClose={()=>setEditModeratorOpen(false)}>
                <EditModerator moderator={currentModerator} onClose={()=>setEditModeratorOpen(false)}/>
            </Modal>
        </div>
    );
};

export default Moderators;
