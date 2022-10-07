/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import AddArticleTag from '../../body/addArticleTag/addArticleTag';
import '../register/Register.scss';
import './CreateArticle.scss';

const CreateArticle = () => {
  const [dataArray, setDataArray] = useState({});
  const [dataTagArray, setDataTagArray] = useState([]);
  let sessionAuthorization = JSON.parse(sessionStorage.getItem(Object.keys(sessionStorage)[0]));
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    let array = dataTagArray.map((item) => item.text);
    
    const user = {
      article: {
        title:`${data.title}`,
        description:`${data.shortDescription}`,
        body:`${data.text}`,
        tagList: array,
      }
    }; 

    const getDataFunction = async () =>{
      try {
        const data = await fetch('https://blog.kata.academy/api/articles', { 
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${sessionAuthorization.user.token}`,
          },
          body: JSON.stringify(user)});
        const resultData = await data.json(); 
        Object.keys(resultData) === 'errors' ? null : navigate('/');
        setDataArray(resultData);        
      } catch (error){
        throw new Error(error);        
      }      
    };
    getDataFunction();
    reset();
  };

  const addArrayTagFunction = (text) => {
    const newItem = createObjectTag(text);

    setDataTagArray([...dataTagArray, newItem]);
  };

  const deleteTagFunction = (id) => {
    setDataTagArray((dataTagArray) => {
      const idx = dataTagArray.findIndex((el) => el.id === id);

      const newArrayElements = [...dataTagArray.slice(0, idx), ...dataTagArray.slice(idx + 1)];

      return [...newArrayElements];
    });
  };

  function createObjectTag (text = ''){
    return {
      id: _.uniqueId(),
      text: text,
    };
  }
   
  return (
    <div className="container__form createArticle">
      <h4 className="form__title">Create new article</h4>
      <form action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          {...register('title', {
            required: '*Заголовок обязателен для заполнения!',     
          })}
          style={errors?.title ? { border: '1px solid red' } : null}
        />
        {errors?.title && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{errors?.title?.message || 'Error!'}</p>
          </div>
        )}
        {dataArray?.errors?.message && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{dataArray.errors.message|| 'Error!'}</p>
          </div>
        )}
        <label htmlFor="shortDescription">Short description</label>
        <input
          id="shortDescription"
          type="text"
          name="shortDescription"
          placeholder="Title"
          {...register('shortDescription', {
            required: '*Краткое содержание обязателено для заполнения!',           
          })}
          style={errors?.shortDescription ? { border: '1px solid red' } : null}
        />
        {errors?.shortDescription && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{errors?.shortDescription?.message || 'Error!'}</p>
          </div>
        )}
        {dataArray?.errors?.message && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{dataArray.errors.message || 'Error!'}</p>
          </div>
        )}
        <label htmlFor="text">Text</label>
        <textarea 
          id="text"
          type="text"
          name="text"
          placeholder="Text"
          {...register('text', {
            required: '*Текстовое содержание статьи обязателено для заполнения!',            
          })}
          style={errors?.text ? { border: '1px solid red' } : null}
        />
        {errors?.text && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-8px' }}>
            <p>{errors?.text?.message || 'Error!'}</p>
          </div>
        )}
        <AddArticleTag dataTagArray={dataTagArray} addArrayTagFunction={addArrayTagFunction} deleteTagFunction={deleteTagFunction}/>
        {errors?.tag && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-15px' }}>
            <p>{errors?.tag?.message || 'Error!'}</p>
          </div>
        )}        
        <button className="form__button createArticle__send" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
