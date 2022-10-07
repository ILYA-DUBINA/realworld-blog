import React from 'react';
import { Link } from 'react-router-dom';

import './links.scss';
import '../../body/list-item/Item.scss';
import './LinksAuthorization.scss';

import img from '../../../image/Rectangle 1.svg';

const LinksAuthorization = (props) => {
  let dataArray =
    JSON.parse(sessionStorage.getItem(JSON.stringify(props?.dataAuthorization?.user?.token))) ??
    props.sessionAuthorization;
  // eslint-disable-next-line no-unsafe-optional-chaining
  let { username, image } = dataArray.user;
  const onClearSession = () => {
    sessionStorage.clear();
    location.reload();
  };

  return (
    <div className="header__autorization linksAuthorization">
      <div className="header__link linksAuthorization__create">
        <Link className="header__createArticle" to="/new-article">
          Create article
        </Link>
      </div>
      <div className="header__link">
        <Link className="header__singIn" to="/profile">
          <div className="item__user linksAuthorization__user">
            <div className="item__user-data">
              <h6 className="data__Username">{username}</h6>
            </div>
            <div className="item__avatar linksAuthorization__avatar">
              <img
                className="item__avatar-image"
                src={image && image !== 'undefined' ? image : img}
                alt="картинка пользователя"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="header__link">
        <button className="header__singUp linksAuthorization__button" onClick={onClearSession}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default LinksAuthorization;
