import React from 'react';
import { Link } from 'react-router-dom';

import '../../header/links/links.scss';
import '../../header/header.scss';
import '../../body/list-item/Item.scss';

const Authorization = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="header__projectName">
          <span className="header__projectName-text">Realworld Blog</span>
        </div>
        <div className="header__autorization">
          <div className="header__link">
            <Link className="header__singIn" to="/profile">
              <div className="item__user">
                <div className="item__user-data">
                  <h6 className="data__Username">John Doe</h6>
                </div>
                <div className="item__avatar">
                  <img className="item__avatar-image" src="#" alt="картинка пользователя" />
                </div>
              </div>
            </Link>
          </div>
          <div className="header__link">
            <Link className="header__singUp" to="/sign-out">
              Sign Out
            </Link>
          </div>
        </div>
      </header>
      <div className="container__inside"></div>
    </div>
  );
};

export default Authorization;
