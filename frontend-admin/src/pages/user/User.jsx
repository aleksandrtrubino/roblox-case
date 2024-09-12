import React from 'react';
import styles from './User.module.scss';
import {Inventory} from './components/inventory/Inventory';
import {Link, useParams} from "react-router-dom";
import {useGetUserByIdQuery, usePatchUserByIdMutation} from "../../api/userApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCoins, faEdit, faUserCheck} from "@fortawesome/free-solid-svg-icons";
import {WithdrawHistory} from "./components/withdrawHistory/WithdrawHistory";
import {DepositHistory} from "./components/depositHistory/DepositHistory";
import {useGetBalanceByUserIdQuery} from "../../api/balanceApi";

const User = () => {
 const {userId} = useParams();
 const user = useGetUserByIdQuery({userId: userId});
 const balance = useGetBalanceByUserIdQuery({userId: userId});

  const [updateUser] = usePatchUserByIdMutation()

  const banUser = async () =>{
    try{
      await updateUser({userId: userId, userDto: {enabled: false}})
    }
    catch (e){
      alert(e)
    }
  }

  const unbanUser = async () =>{
    try{
      await updateUser({userId: userId, userDto: {enabled: true}})
    }
    catch (e){
      alert(e)
    }
  }

  return (
      user.isSuccess && balance.isSuccess ?
          <div className={styles.profile}>
            <div className={`${styles.profile_settings} ${styles.settings}`}>
              <div className={styles.settings_right}>
                {/*<button className={styles.settings_button}>*/}
                {/*  <svg*/}
                {/*    className={styles.settings_icon}*/}
                {/*    viewBox="0 0 24 24"*/}
                {/*    xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path*/}
                {/*      fillRule="evenodd"*/}
                {/*      clipRule="evenodd"*/}
                {/*      d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z"*/}
                {/*    />*/}
                {/*  </svg>*/}
                {/*  <span className={styles.settings_text}>Настройки</span>*/}
                {/*</button>*/}

              </div>
            </div>
            <div className={`${styles.profile_header} ${styles.avatar}`}>
              <div className={styles.avatar_picture}>{user.data.nickname[0].toUpperCase()}</div>
              <div className={styles.details}>
                <div className={styles.details_content}>
                  <span className={styles.details_name}>{"Никнейм: " + user.data.nickname}</span>
                  <span className={styles.details_name}>{"Почта: " + user.data.email}</span>
                  <span className={styles.details_name}>{user.data.contact.type.name + ": " + user.data.contact.link}</span>
                  <span className={styles.details_name}>{"Баланс: " + balance.data.balance}</span>
                </div>
                <div className={styles.details_buttons}>
                  {
                    user.data.enabled ?
                        <button className={styles.details_buttonBan} onClick={banUser}>
                          <FontAwesomeIcon className={styles.details_buttonBan_money_icon} icon={faBan} />
                          Забанить
                        </button>
                        :
                        <button className={styles.details_buttonUnban} onClick={unbanUser}>
                          <FontAwesomeIcon className={styles.details_buttonUnban_money_icon} icon={faUserCheck} />
                          Разбанить
                        </button>
                  }
                </div>
              </div>
            </div>
            {/*<Friends />*/}
            <div className={styles.main}>
              <div className= {styles.header}>
                <div className={styles.header_wrapper}>

                  <div className={styles.header_button}>
                    <div className={styles.header_button_wrapper}>
                      <svg
                          className={styles.header_icon}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2083 7.82141L12.5083 12.2814C12.1983 12.4614 11.8083 12.4614 11.4883 12.2814L3.78826 7.82141C3.23826 7.50141 3.09826 6.75141 3.51826 6.28141C3.80826 5.95141 4.13826 5.68141 4.48826 5.49141L9.90826 2.49141C11.0683 1.84141 12.9483 1.84141 14.1083 2.49141L19.5283 5.49141C19.8783 5.68141 20.2083 5.96141 20.4983 6.28141C20.8983 6.75141 20.7583 7.50141 20.2083 7.82141Z" />
                        <path d="M11.4305 14.1389V20.9589C11.4305 21.7189 10.6605 22.2189 9.98047 21.8889C7.92047 20.8789 4.45047 18.9889 4.45047 18.9889C3.23047 18.2989 2.23047 16.5589 2.23047 15.1289V9.9689C2.23047 9.1789 3.06047 8.6789 3.74047 9.0689L10.9305 13.2389C11.2305 13.4289 11.4305 13.7689 11.4305 14.1389Z" />
                        <path d="M12.5703 14.1389V20.9589C12.5703 21.7189 13.3403 22.2189 14.0203 21.8889C16.0803 20.8789 19.5503 18.9889 19.5503 18.9889C20.7703 18.2989 21.7703 16.5589 21.7703 15.1289V9.9689C21.7703 9.1789 20.9403 8.6789 20.2603 9.0689L13.0703 13.2389C12.7703 13.4289 12.5703 13.7689 12.5703 14.1389Z" />
                      </svg>
                      <span>Инвентарь</span>
                    </div>
                  </div>
                </div>
              </div>
              <Inventory userId={userId}/>
            </div>
            <div className={styles.main}>
              <div className= {styles.header}>
                <div className={styles.header_wrapper}>

                  <div className={styles.header_button}>
                    <div className={styles.header_button_wrapper}>
                      <svg
                          className={styles.header_icon}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z" />
                        <path d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z" />
                      </svg>
                      <span>История выводов</span>
                    </div>
                  </div>
                </div>
              </div>
              <WithdrawHistory userId={userId} />
            </div>
            <div className={styles.main}>
                <div className= {styles.header}>
                    <div className={styles.header_wrapper}>
                        <div className={styles.header_button}>
                            <div className={styles.header_button_wrapper}>
                                <svg
                                    className={styles.header_icon}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22,17a4,4,0,1,1-4-4A4,4,0,0,1,22,17ZM21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2h9.54A5.99,5.99,0,0,1,22,12.54V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Z" />
                                </svg>
                                <span>История пополнений</span>
                            </div>
                        </div>
                    </div>
                </div>
                <DepositHistory userId={userId} />
            </div>



            {/* <History /> */}
          </div>
          :
          user.isLoading ?
              'loading..'
              :
              user.isError ?
                  'Error happened'
                  :
                  'Pizdec'
  );
};

export default User;
