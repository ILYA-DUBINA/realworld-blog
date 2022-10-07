/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import '../../pages/createArticle-page/CreateArticle.scss';
import '../../pages/register/Register.scss';

const AddArticleTag = (props) => {
  const [textEl, setTextEl] = useState('');
  const { addArrayTagFunction, dataTagArray, deleteTagFunction } = props;
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onAddText = (e) => {
    setTextEl(e.target.value);
  };

  return (
    <div className="createArticle__tags">
      <div className="tag__input-tag">
        <label className="createArticle__label" htmlFor="tag">
          Tags
        </label>
        {dataTagArray.length === 0
          ? null
          : dataTagArray.map((item) => {
            return (
              <div key={item.id} className="tag__input">
                <div>
                  <input
                    className="tag__input-input"
                    id="tag"
                    type="text"
                    value={item.text}
                    onChange={onAddText}
                    style={errors?.tag ? { border: '1px solid red' } : null}
                  />
                </div>
                <div className="createArticle__tags-button" onClick={() => deleteTagFunction(item.id)}>Delete</div>
              </div>
            );
          })
        }
        <div className="tag__input tag__input-tag">
          <div>
            <input
              id="tag"
              type="text"
              name="tag"
              placeholder="Tag"
              value={textEl}
              {...register('tag', {
                onChange: onAddText,
              })}
              style={errors?.tag ? { border: '1px solid red' } : null}
            />
          </div>
          <div className="createArticle__tags-button">Delete</div>
        </div>
      </div>
      <div className="createArticle__tags-button addTag" onClick={() => {
        addArrayTagFunction(textEl);
        setTextEl('');
      }} >
        Add tag
      </div>
    </div>
  );
};

export default AddArticleTag;
