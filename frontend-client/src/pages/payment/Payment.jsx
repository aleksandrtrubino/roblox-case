import React, {useState} from 'react';

import { PaymentMethod } from './components/paymentMethod/PaymentMethod';

import styles from './payment.module.scss';
import {useGetBalanceEventMeQuery} from "../../api/balanceEventApi";
import {BoxCard} from "../home/components/boxCard/BoxCard";
import {DepositHistoryItem} from "./components/depositHistoryItem/DepositHistoryItem";
import {useDepositMeMutation} from "../../api/balanceApi";
import {useGetPromoCodeQuery, useLazyGetPromoCodeQuery} from "../../api/promoCodeApi";


export const Payment = () => {

  const balanceEvents = useGetBalanceEventMeQuery();

  const [promoCodeInput, setPromoCodeInput] = useState(""); // Input field value for promo code
  const [promoCode, setPromoCode] = useState(null); // Promo code object from the API
  const [sum, setSum] = useState(""); // Input field value for the deposit sum

  const [depositMe] = useDepositMeMutation(); // Mutation for deposit
  const promoCodeQuery = useGetPromoCodeQuery(
      { promoCode: promoCodeInput },  // Passing parameters
      { skip: promoCodeInput === "" }       // Skipping if promoCodeInput is empty
  );

  let content;
  if (balanceEvents.isSuccess && balanceEvents.data && balanceEvents.data.length > 0) {
    content = balanceEvents.data.map((balanceEvent) => (
        <DepositHistoryItem key={balanceEvent.id} balanceEvent={balanceEvent} />
    ));
  }

  const promoCodeClick = async (e) => {
    e.preventDefault();

    if (promoCodeQuery.isSuccess && promoCodeQuery.data) {
      alert(`Promocode: ${promoCodeQuery.data.code}`)
      setPromoCode(promoCodeQuery.data)
      if(promoCodeQuery.data.type.id === 2 && sum === ""){
        try {
          await depositMe({ sum: 0, promoCode: promoCodeQuery.data.code }); // Send deposit with 0 sum
          alert("Deposit successful with 0 sum.");
        } catch (error) {
          console.error("Deposit failed:", error);
          alert("Deposit failed.");
        }
      }
    }
    if(promoCodeQuery.isError){
      alert("Error on the server side fetching promocode")
    }
  };

  const depositClick = async (e) => {
    e.preventDefault();

    // Формируем объект запроса
    const depositPayload = {
      sum, // Всегда передаем сумму
      ...(promoCode ? { promoCode: promoCode.code } : {}) // Добавляем promoCode, если он существует
    };

    if (promoCode && promoCode.type.id === 1 && (sum === "" || sum === 0)) {
      // Если промокод тип 1 и сумма 0 или пустая
      try {
        await depositMe({ sum: 0, promoCode: promoCode.code }); // Отправляем депозит с суммой 0
        alert("Deposit successful with 0 sum.");
      } catch (error) {
        console.error("Deposit failed:", error);
        alert("Deposit failed.");
      }
    } else if (promoCode && promoCode.type.id === 2 && (sum === "" || sum == 0)) {
      // Если промокод тип 2 и сумма 0, не разрешаем
      alert("Percentage-based promo cannot be applied with 0 sum.");
    } else {
      // Обработка депозита с непустой суммой или без промокода
      let result;
      try {
        result = await depositMe(depositPayload).unwrap(); // Отправляем депозит
      } catch (error) {
        console.error("Deposit failed:", result);
        alert("Deposit failed.");
      }
    }
  };


  return (
    <div className={styles.payment}>
      <div className={styles.payment_header}>
        <svg className={styles.payment_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22,17a4,4,0,1,1-4-4A4,4,0,0,1,22,17ZM21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2h9.54A5.99,5.99,0,0,1,22,12.54V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Z" />
        </svg>
        <span className={styles.payment_title}>Пополнение баланса</span>
      </div>
      <div className={styles.payment_wrapper}>
        {/*<div className={`${styles.payment_left} ${styles.left}`}>*/}
        {/*  <ul className={`${styles.left_methods} ${styles.methods}`}>*/}
        {/*    <PaymentMethod prompt={'cards'} />*/}
        {/*    <PaymentMethod prompt={'qiwi'} />*/}
        {/*    <PaymentMethod prompt="sbp" />*/}
        {/*    <PaymentMethod prompt="sber" />*/}
        {/*    <PaymentMethod />*/}
        {/*    <PaymentMethod />*/}
        {/*  </ul>*/}
        {/*  <span className={styles.methods_alert}>*/}
        {/*    Для пополнения баланса вы будете перемещены на сайт платежной системы.*/}
        {/*  </span>*/}
        {/*</div>*/}
        <div className={styles.right}>
          {/*<div className={`${styles.right_selected} ${styles.selected}`}>*/}
          {/*  <div className={styles.selected_method}>*/}
          {/*    <span className={styles.selected_title}>Выбранный способ оплаты</span>*/}
          {/*    <span className={styles.selected_option}>CARDS</span>*/}
          {/*  </div>*/}
          {/*  <div className={styles.selected_picture}></div>*/}
          {/*</div>*/}
          <form className={styles.promocode} onSubmit={promoCodeClick}>
            <div className={`${styles.promocode_field} ${styles.field}`}>
              <svg
                className={styles.field_icon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M14 3v18H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5V4a1 1 0 0 1 1-1h11zm2 0h5a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1h-5V3z" />
                </g>
              </svg>
              <input className={styles.field_input}
                     type="text"
                     placeholder="Промокод"
                     value={promoCodeInput}
                     onChange={(e) => setPromoCodeInput(e.target.value)}
              />
            </div>
            <button className={styles.promocode_confirm} type="submit" >Применить</button>
          </form>
          <form onSubmit={depositClick}>
            <div className={styles.refill}>
              {/* <div className={`${styles.refill_minimal} ${styles.minimal}`}>
              <span className={styles.minimal_title}>Минимальная сумма </span>
              <span className={styles.minimal_count}>{minimalCount}</span>
              <span className={styles.minimal_valute}>M</span>
            </div> */}

              <div className={styles.refill_field} >
                <div className={styles.refill_left} >
                  <svg
                      className={styles.refill_icon}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                  <input
                      className={styles.refill_input}
                      type="number"
                      min={0}
                      max={99999}
                      placeholder="Сумма"
                      value={sum}
                      onChange={(e) => setSum(e.target.value)}
                  />
                </div>
                {/*<svg*/}
                {/*  className={styles.refill_convert}*/}
                {/*  viewBox="0 0 24 24"*/}
                {/*  xmlns="http://www.w3.org/2000/svg">*/}
                {/*  <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />*/}
                {/*</svg>*/}
                {/*<div className={styles.refill_right}>*/}
                {/*  <span className={styles.refill_total}>200 M</span>*/}
                {/*</div>*/}
              </div>
              {/*<div className={`${styles.refill_selectors} ${styles.selectors}`}>*/}
              {/*  <button className={styles.selectors_button}>100</button>*/}
              {/*  <button className={styles.selectors_button}>🤘 150</button>*/}
              {/*  <button className={styles.selectors_button}>200</button>*/}
              {/*  <button className={styles.selectors_button}>250</button>*/}
              {/*  <button className={styles.selectors_button}>500</button>*/}
              {/*</div>*/}
            </div>
            <button className={styles.recharge}>
              <span className={styles.recharge_title}>Пополнить</span>
              <svg
                  className={styles.recharge_icon}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                <path d="M22,17a4,4,0,1,1-4-4A4,4,0,0,1,22,17ZM21,3H4A2,2,0,0,0,2,5V19a2,2,0,0,0,2,2h9.54A5.99,5.99,0,0,1,22,12.54V8a1,1,0,0,0-1-1H5A1,1,0,0,1,5,5H22V4A1,1,0,0,0,21,3Z" />
              </svg>
            </button>
          </form>


        </div>
      </div>
      <div className={styles.history}>

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
                <span>История пополнений</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {content}
        </div>

      </div>
    </div>
  );
};
