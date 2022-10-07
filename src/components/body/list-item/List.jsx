import React from 'react';

import Item from './Item';

import './List.scss';

const List = (props) => {
  const { setSlugElement, addLikeArticle, deleteLikeArticle } = props;

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  let elements = props.arrayList.map((item, index) => {
    return (
      <Item
        key={generateKey(index)}
        {...item}
        setSlugElement={() => setSlugElement(item)}
        addLikeArticle={() => addLikeArticle(item)}
        deleteLikeArticle={() => deleteLikeArticle(item)}
      />
    );
  });
  return <div className="body__list">{elements}</div>;
};

export default List;
