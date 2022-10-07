/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// eslint-disable-next-line import/order
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../../modal/modal';

import './Article.scss';
import '../../body/list-item/Item.scss';

// eslint-disable-next-line import/order
import moment from 'moment';

import imageTwo from '../../../image/Vector.svg';
import imageThree from '../../../image/path4.svg';

const Article = (props) => {
  let { author, title, description, createdAt, tagList, body, slug, favorited, favoritesCount } = props.slugElement;
  let sessionAuthorization = JSON.parse(
    sessionStorage.getItem(Object.keys(sessionStorage)[Object.keys(sessionStorage).length - 1])
  );
  let dataArray =
    JSON.parse(sessionStorage.getItem(JSON.stringify(props?.dataAuthorization?.user?.token))) ?? sessionAuthorization;
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dataErrorArray, setDataErrorArray] = useState({});


  const deleteFunction = async () => {
    try {
      const obj = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionAuthorization.user.token}`,
        },
      });
      if(obj.ok !== true){
        let r = await obj.json();
        setDataErrorArray(r);
      } 
      navigate('/');     
    } catch (error) {
      throw new Error(error);
    }
  };    

  return (
    <div className="body__list-all">
      <div className="body__list-item">
        <div className="item__allText">
          {dataErrorArray?.errors?.body && (
            <div className="error" style={{ height: 40, color: 'red' }}>
              <p>{dataErrorArray.errors.body || 'Error!'}</p>
            </div>
          )}
          <div className="item__allText-header">
            <a className="header__title-link" href="#">
              <h5 className="header__title">{title}</h5>
            </a>
            <div className="header__image">
              {favorited ? (
                <img className="header__image-img" src={imageThree} alt="картинка красного сердечка" />
              ) : (
                <img className="header__image-img" src={imageTwo} alt="картинка прозрачного сердечка" />
              )}
              <span className="header__image-number">{favoritesCount}</span>
            </div>
          </div>
          <div className="item__allText-tags">
            {tagList.length > 0 ? tagList.map((item) => { return (  <div key={Math.random()} className="tags__item article-tags"> {item} </div> ); }) : null}
          </div>
          <div className="item__allText-text article-text">
            <span className="text__inside">{description}</span>
          </div>   
        </div>        
        <div className="item__userAll">
          <div className="item__user article-user">
            <div className="item__user-data">
              <h6 className="data__Username">{author.username}</h6>
              <p className="data__Userage">{moment(createdAt).format('MMMM D, YYYY')}</p>
            </div>
            <div className="item__avatar">
              <img className="item__avatar-image" src={author.image} alt="картинка пользователя" />
            </div>
          </div>       
          { author.username === dataArray.user.username ?             
            <div className="authorization__buttons">
              <button className="authorization__button-delete" onClick={() => setShow(true)} >
                Delete           
              </button>                
              <Modal onClose={() => setShow(false)} show={show} deleteFunction={deleteFunction}>
                <p>Are you sure to delete this article?</p>
              </Modal>  
              <Link to='/edit'><button className="authorization__button-edit">Edit</button></Link>
            </div>
            : null 
          }
        </div>   
      </div>        
      <div className="item__allText-bodyMarkDown">
        <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
      </div>  
    </div>
  );
};

export default Article;
