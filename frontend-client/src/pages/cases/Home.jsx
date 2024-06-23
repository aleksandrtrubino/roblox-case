//* Импортирование блока с бонусами ( Bonus )
import React from 'react';
import { Bonus } from './components/bonus/Bonus';
import caseImage from '../../assets/cases/case1.png';
import {CaseCard} from "./components/caseCard/CaseCard";
import styles from './home.module.scss';

export const Home = () => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const caseInfoExamples = [
    {
      id: 1,
      name: "Кейс 1",
      cost: 100
    },
    {
      id: 2,
      name: "Кейс 2",
      cost: 100
    },
    {
      id: 3,
      name: "Кейс 3",
      cost: 100
    }
  ]

  return (
    <div className={styles.cases}>
      <Bonus />
      <div className={styles.cases_wrapper}>
        <ul className={styles.list}>
          <li className={styles.row}>
            <h1 className={styles.row_title}>Кейсы (убрать заголовок?)</h1>
            <ul className={styles.row_list}>
              {caseInfoExamples.map((caseInfo) => <CaseCard key = {caseInfo.id} caseInfo={caseInfo} />)}
              {/*<CaseCard caseInfo={caseInfoExample}/>*/}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
