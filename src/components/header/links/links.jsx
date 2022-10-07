import React from 'react';
import { Link } from 'react-router-dom';

import './links.scss';

const Links = () => {
  return (
    <div className="header__autorization">
      <div className="header__link">
        <Link className="header__singIn" to="/sign-in">
          Sign In
        </Link>
      </div>
      <div className="header__link">
        <Link className="header__singUp" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Links;
