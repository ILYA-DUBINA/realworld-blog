/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = (props) => {
  const [dataArray, setDataArray] = useState({});
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const user = {
      user:{
        username:`${data.userName}`,
        email:`${data.email}`,
        password:`${data.password}`,  
      } 
    }; 

    const getDataFunction = async () =>{
      try {
        const data = await fetch('https://blog.kata.academy/api/users', { 
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
      <h4 className="form__title">Create new account</h4>
      <form action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          type="text"
          name="userName"
          placeholder="Username"
          {...register('userName', {
            required: '*Имени у вас не может не быть!',
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
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          name="repeatPassword"
          placeholder="Password"
          {...register('repeatPassword', {
            required: '*Пароли не совпадают!',
            minLength: {
              value: 6,
              message: '*Пароль должен быть от 6 до 20 символов включительно!',
            },
            maxLength: {
              value: 20,
              message: '*Пароль должен быть от 6 до 20 символов включительно!',
            },
            validate: (value) => {
              if (watch('password') != value) {
                return 'Your passwords do no match';
              }
            },
          })}
          style={errors?.repeatPassword ? { border: '1px solid red' } : null}
        />
        {errors?.repeatPassword && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-15px' }}>
            <p>{errors?.repeatPassword?.message || 'Error!'}</p>
          </div>
        )}
        <div className="form__checkbox">
          <input
            className="form__checkbox-input"
            id="checkbox"
            type="checkbox"
            name="checkbox"
            {...register('checkbox', {
              required: '*Необходимо обязательное подтверждение вашего согласия!',
            })}
            style={errors?.checkbox ? { border: '1px solid red', boxShadow: 'inset 0 0 0 1pt red' } : null}
          />
          <label className="form__checkbox-text" htmlFor="checkbox">
            I agree to the processing of my personal information
          </label>
        </div>
        {errors?.checkbox && (
          <div className="error" style={{ height: 40, color: 'red', position: 'relative', top: '-22px' }}>
            <p>{errors?.checkbox?.message || 'Error!'}</p>
          </div>
        )}
        <button className="form__button" type="submit">
          Create
        </button>
        <div className="form__already">
          <span className="form__already-text">Already have an account?</span>
          <Link className="form__already-link" to="/sign-in">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
