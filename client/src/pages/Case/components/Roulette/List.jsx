import React from 'react';
import ListItem from './ListItem';

const items = [
  { name: 'alicorn', img: 'alicorn.png', chance: 10 },
  { name: 'alpaca', img: 'alpaca.png', chance: 10 },
  { name: 'ant', img: '.ant.png', chance: 12 },
  { name: 'cat', img: 'cat.png', chance: 20 },
  { name: 'rabbit', img: 'rabbit.png', chance: 5 }
];

const getItem = () => {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 100);
    items.forEach(elm => {
      if (chance < elm.chance && !item) item = elm;
    });
  }

  return item;
};

const generateItems = (cells) => {
  const generatedItems = [];
  for (let i = 0; i < cells; i++) {
    const item = getItem();
    generatedItems.push(item);
  }
  return generatedItems;
};

const List = ({ cells }) => {
  const generatedItems = generateItems(cells);

  return (
    <ul className="list">
      {generatedItems.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default List;
