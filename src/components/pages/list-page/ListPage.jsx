import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css';

// eslint-disable-next-line import/order
import List from '../../body/list-item/List';

import './listPage.scss';
import { SpinerLoading } from '../../spinerLoading/spinerLoading';

const ListPage = (props) => {
  const [arrayList, setArrayList] = useState([]);
  const [page, setPage] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);

  const { setSlugElement } = props;
  let sessionAuthorization = JSON.parse(sessionStorage.getItem(Object.keys(sessionStorage)[0]));

  useEffect(() => {
    try {
      const getArticles = async (page) => {
        const result = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${page}`);
        const articles = await result.json();
        setArrayList(articles.articles);
        setArticlesCount(articles.articlesCount);
      };
      getArticles(page);
    } catch (error) {
      throw Error(error);
    }
  }, [page]);

  const addLikeArticle = (postSlug) => {
    fetch(`https://blog.kata.academy/api/articles/${postSlug.slug}/favorite`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionAuthorization.user.token}`,
      },
      body: JSON.stringify(postSlug),
    })
      .then((item) => item.json())
      .then((itemTwo) => {
        setArrayList((clickArticle) => {
          const idx = clickArticle.findIndex((el) => el.slug === postSlug.slug);

          let newItem = clickArticle[idx];
          newItem = itemTwo.article;

          const newArrayElements = [...clickArticle.slice(0, idx), newItem, ...clickArticle.slice(idx + 1)];

          return [...newArrayElements];
        });
      })
      .catch((error) => new Error(error));
  };

  const deleteLikeArticle = (postSlug) => {
    fetch(`https://blog.kata.academy/api/articles/${postSlug.slug}/favorite`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionAuthorization.user.token}`,
      },
      body: JSON.stringify(postSlug),
    })
      .then((item) => item.json())
      .then((itemTwo) => {
        setArrayList((clickArticle) => {
          const idx = clickArticle.findIndex((el) => el.slug === postSlug.slug);

          let newItem = clickArticle[idx];
          newItem = itemTwo.article;

          const newArrayElements = [...clickArticle.slice(0, idx), newItem, ...clickArticle.slice(idx + 1)];

          return [...newArrayElements];
        });
      })
      .catch((error) => new Error(error));
  };

  return (
    <div className="body">
      {arrayList.length === 0 ? (
        <SpinerLoading />
      ) : (
        <>
          <List
            arrayList={arrayList}
            setSlugElement={setSlugElement}
            addLikeArticle={addLikeArticle}
            deleteLikeArticle={deleteLikeArticle}
          />
          <div className="pagination">
            <Pagination
              size="small"
              total={articlesCount}
              onChange={(page) => {
                setPage(page - 1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListPage;
