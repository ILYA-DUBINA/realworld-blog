import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './header/header';
import ListPage from './pages/list-page/ListPage';
import Article from './pages/article-page/Article';
import Register from './pages/register/Register';
import SignIn from './pages/signIn/SignIn';
import Profile from './pages/profile/Profile';
import CreateArticle from './pages/createArticle-page/CreateArticle';
import EditArticle from './pages/editArticle/EditArticle';

import './App.scss';

const App = () => {
  const [slugElement, setSlugElement] = useState('');
  const [dataAuthorization, setDataAuthorization] = useState({});

  return (
    <>
      <div className="container">
        <Header dataAuthorization={dataAuthorization} />
        <div className="container__inside">
          <Routes>
            <Route path="/" element={<ListPage setSlugElement={setSlugElement} />} />
            <Route
              path="/article"
              element={<Article slugElement={slugElement} dataAuthorization={dataAuthorization} />}
            />
            <Route path="/sign-up" element={<Register setDataAuthorization={setDataAuthorization} />} />
            <Route path="/sign-in" element={<SignIn setDataAuthorization={setDataAuthorization} />} />
            <Route path="/profile" element={<Profile setDataAuthorization={setDataAuthorization} />} />
            <Route path="/new-article" element={<CreateArticle />} />
            <Route path={'/edit'} element={<EditArticle slugElement={slugElement} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default App;
