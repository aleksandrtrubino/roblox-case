import React, { useState } from 'react';
import List from './List'; 
import './roulette.scss'

export const Roulette = () => {

  const [isStarted, setIsStarted] = useState(false);
  const [isFirstStart, setIsFirstStart] = useState(true);

  const start = () => {
    if (isStarted) return;
    setIsStarted(true);

    if (!isFirstStart) {
      List.generateItems(); 
    } else {
      setIsFirstStart(false);
    }

    const list = document.querySelector('.list');
    setTimeout(() => {
      list.style.left = '50%';
      list.style.transform = 'translate3d(-50%, 0, 0)';
    }, 0);

    const item = list.querySelectorAll('li')[35];
    list.addEventListener(
      'transitionend',
      () => {
        setIsStarted(false);
        item.classList.add('active');
        const data = JSON.parse(item.getAttribute('data-item'));
        console.log(data);
      },
      { once: true }
    );
  };

  return (
    <div className="roulette">
      <div className="scope">
        <List cells={71} />
      </div>
      <button onClick={start} className="start">
        Крути дружочек
      </button>
    </div>
  )
}
