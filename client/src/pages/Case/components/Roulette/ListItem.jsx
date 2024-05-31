import React from 'react';

const ListItem = ({ item }) => (
  <li className="list__item" data-item={JSON.stringify(item)}>
    <img src={require(`../../../../assets/test/${item.name}.png`)} alt={item.name} />
  </li>
);

export default ListItem;
