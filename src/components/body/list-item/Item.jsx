/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Item.scss';
import imageTwo from '../../../image/Vector.svg';
import imageThree from '../../../image/path4.svg';

const Item = (props) => {
  // eslint-disable-next-line prettier/prettier
  const { 
    author, 
    description, 
    title, 
    createdAt, 
    tagList, 
    setSlugElement, 
    addLikeArticle, 
    favoritesCount, 
    favorited,
    deleteLikeArticle
  } = props;

  return (
    <div className="body__list-all">
      <div className="body__list-item">
        <div className="item__allText">
          <div className="item__allText-header">
            <Link className="header__title-link" to="/article" onClick={setSlugElement}>
              <h5 className="header__title">{title}</h5>
            </Link>
            <div className="header__image">
              {favorited ? (
                <img
                  className="header__image-img"
                  onClick={deleteLikeArticle}
                  src={imageThree}
                  alt="картинка красного сердечка"
                />
              ) : (
                <img
                  className="header__image-img"
                  onClick={addLikeArticle}
                  src={imageTwo}
                  alt="картинка прозрачного сердечка"
                />
              )}
              <span className="header__image-number">{favoritesCount}</span>
            </div>
          </div>
          <div className="item__allText-tags">
            {tagList.map((item) => {
              return (
                <div key={Math.random()} className="tags__item">
                  {item}
                </div>
              );
            })}
          </div>
          <div className="item__allText-text">
            <span className="text__inside">{description}</span>
          </div>
        </div>
        <div className="item__user">
          <div className="item__user-data">
            <h6 className="data__Username">{author.username}</h6>
            <p className="data__Userage">{moment(createdAt).format('MMMM D, YYYY')}</p>
          </div>
          <div className="item__avatar">
            <img className="item__avatar-image" src={author.image} alt="картинка пользователя" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
