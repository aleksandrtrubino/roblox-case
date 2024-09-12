import React, {useState} from 'react';
import styles from './Users.module.scss';
import {useGetAllUsersQuery} from "../../api/userApi";
import {SearchBar} from "./components/searchBar/SearchBar";
import {useNavigate} from "react-router-dom";


const Users = () => {
  const [selectedSearch, setSelectedSearch] = useState('');


  const users = useGetAllUsersQuery({search: selectedSearch, authorityId: 3});

// let content = [<AddPetCardButton onClick={()=>setIsCreatePetCardOpen(true)}/>];
// if(petCards.isSuccess && petCards.data && petCards.data.length > 0){
//     content = [...content, petCards.data.map((petCard) => <PetCardItem
//         key = {petCard.id}
//         petCard={petCard}
//         isActive={false}
//         onClick={() => handlePetCardItemClick(petCard)}/>)];
// }

  const navigate = useNavigate();

  let content;
  if(users.isSuccess && users.data && users.data.length > 0){
    content = users.data.map((user)=>
        <div className={styles.user} onClick={()=>{navigate(`/user/${user.id}`)}}>
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
        Пользователи
      </div>
      <SearchBar search={selectedSearch} setSearch={setSelectedSearch} submitSearch={()=>{}} />
      {content}
    </div>
  );
};

export default Users;
