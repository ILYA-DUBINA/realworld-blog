import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/order
import Links from './links/links';

import './header.scss';
import LinksAuthorization from './links/LinksAuthorization';

const Header = (props) => {
  let sessionAuthorization = JSON.parse(
    sessionStorage.getItem(Object.keys(sessionStorage)[Object.keys(sessionStorage).length - 1])
  );
  return (
    <header className="header">
      <div className="header__projectName">
        <Link to="/">
          <span className="header__projectName-text">Realworld Blog</span>
        </Link>
      </div>
      {Object.keys(props?.dataAuthorization).length === 0 && Object.keys(sessionStorage).length === 0 ? (
        <Links />
      ) : (
        <LinksAuthorization dataAuthorization={props.dataAuthorization} sessionAuthorization={sessionAuthorization} />
      )}
    </header>
  );
};

export default Header;
