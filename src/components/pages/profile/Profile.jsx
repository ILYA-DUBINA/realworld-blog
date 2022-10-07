/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './Profile.scss';
import '../register/Register.scss';
import '../signIn/SignIn.scss';

const Profile = (props) => {
  const [dataArray, setDataArray] = useState({});
  const [sucсess, setSucсess] = useState(false);
  let sessionAuthorization = JSON.parse(sessionStorage.getItem(Object.keys(sessionStorage)[0]));
  const [sessionUsername, setSessionUsername] = useState(sessionAuthorization?.user?.username);
  const [sessionEmail, setSessionEmail] = useState(sessionAuthorization?.user?.email);  

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const user = {
      // eslint-disable-next-line prettier/prettier
      user:{
        email:`${data.email}`,
        password:`${data.password}`,
        username:`${data.userName}`,    
        image:`${data.image}` || ' ',
      },
    };

    const getDataFunction = async () =>{
      try {
        const data = await fetch('https://blog.kata.academy/api/user', { 
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${sessionAuthorization.user.token}`
          },
          body: JSON.stringify(user)});
        const resultData = await data.json(); 
        Object.keys(resultData) === 'errors' ? null : sessionStorage.setItem(JSON.stringify(resultData?.user?.token), JSON.stringify(resultData)), props.setDataAuthorization(resultData), setSucсess(true);
        setDataArray(resultData);        
      } catch (error){
        throw new Error(error);        
      }      
    };
    
    getDataFunction();
    reset();  
  };

  const onChangeValueUserName = (e) => {
    setSessionUsername(e.target.value);
    setSucсess(false);
  };
  const onChangeValueEmail = (e) => {
    setSessionEmail(e.target.value);
    setSucсess(false);
  };

  return (
    <div className="container__form">
      <h4 className="form__title">Edit Profile</h4>
      <form action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          type="text"
          name="userName"
          placeholder="Username"
          value={sessionUsername}          
          {...register('userName', {
            required: '*Имени у вас не может не быть!',
            onChange: onChangeValueUserName,
            minLength: {
              value: 3,
              message: 'Имя должно быть от 3 до 20 символов включительно!',
            },
            maxLength: {
              value: 20,
              message: 'Имя должно быть от 3 до 20 символов включительно!',
            },
          })}
          style={errors?.userName ? { border: '1px solid red' } : null}
        />
        {errors?.userName && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{errors?.userName?.message || 'Error!'}</p>
          </div>
        )}
        {dataArray?.errors?.username && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{dataArray.errors.username || 'Error!'}</p>
          </div>
        )}
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
          value={sessionEmail}
          {...register('email', {
            required: '*Электронный адрес не может быть пустым!',
            onChange: onChangeValueEmail,
            pattern: {
              value: /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$/,
              message: '*Вы ввели не корректный адрес!',
            },
          })}
          style={errors?.email ? { border: '1px solid red' } : null}
        />
        {errors?.email && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{errors?.email?.message || 'Error!'}</p>
          </div>
        )}
        {dataArray?.errors?.email && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{dataArray.errors.email || 'Error!'}</p>
          </div>
        )}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          {...register('password', {
            required: '*Пароль не может быть пустым!',
            minLength: {
              value: 6,
              message: '*Пароль должен быть от 6 до 40 символов включительно!',
            },
            maxLength: {
              value: 40,
              message: '*Пароль должен быть от 6 до 40 символов включительно!',
            },
          })}
          style={errors?.password ? { border: '1px solid red' } : null}
        />
        {errors?.password && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-8px' }}>
            <p>{errors?.password?.message || 'Error!'}</p>
          </div>
        )}
        {dataArray?.errors?.password && (
          <div className="error" style={{ height: 40, color: 'red' }}>
            <p>{dataArray.errors.password || 'Error!'}</p>
          </div>
        )}
        <label htmlFor="image">Avatar image (url)</label>
        <input
          id="image"
          type="text"
          name="image"
          placeholder="Avatar image"
          {...register('image', {
            pattern: {
              value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
              message: '*Вы ввели не корректный url адрес!',
            },
          })}
          style={errors?.image ? { border: '1px solid red' } : null}
        />
        {errors?.image && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-8px' }}>
            <p>{errors?.image?.message || 'Error!'}</p>
          </div>
        )}
        <button className="form__button singIn__button" type="submit">
          Save
        </button>
        {sucсess ? (
          <div className="error" style={{ height: 40, color: 'green' }}>
            <p>{'Поздравляем!!! Вы успешно изменили свой профиль, для выхода на глывную страницу нажмите на Realworld Blog'}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Profile;
