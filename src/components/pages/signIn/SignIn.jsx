/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import '../register/Register.scss';
import './SignIn.scss';

const SignIn = (props) => {
  const [dataArray, setDataArray] = useState({});
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
    const user = {
      // eslint-disable-next-line prettier/prettier
      user:{
        email:`${data.email}`,
        password:`${data.password}`,
      },
    };

    const getDataFunction = async () =>{
      try {
        const data = await fetch('https://blog.kata.academy/api/users/login', { 
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)});
        const resultData = await data.json(); 
        Object.keys(resultData) === 'errors' ? null : sessionStorage.setItem(JSON.stringify(resultData?.user?.token), JSON.stringify(resultData)), props.setDataAuthorization(resultData), navigate('/');
        setDataArray(resultData);        
      } catch (error){
        throw new Error(error);        
      }      
    };
    
    getDataFunction();
    reset();  
  };

  return (
    <div className="container__form">
      <h4 className="form__title">Sign In</h4>
      <form action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
          {...register('email', {
            required: '*Электронный адрес не может быть пустым!',
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
              message: '*Пароль должен быть от 6 до 20 символов включительно!',
            },
            maxLength: {
              value: 20,
              message: '*Пароль должен быть от 6 до 20 символов включительно!',
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
        <button className="form__button singIn__button" type="submit">
          Login
        </button>
        <div className="form__already">
          <span className="form__already-text">Don’t have an account?</span>
          <Link className="form__already-link" to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
