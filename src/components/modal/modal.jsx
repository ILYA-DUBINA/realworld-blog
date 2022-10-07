import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './modal.scss';
import image from '../../image/warning.svg';

const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <div className="modal-image">
              <img className="modal-image-img" src={image} alt="картинка предупреждения" />
            </div>
            <div className="modal-text">{props.children}</div>
          </div>
          <div className="modal-footer">
            <button onClick={props.deleteFunction} className="button-ok">
              Yes
            </button>
            <button onClick={props.onClose} className="button-no">
              No
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default Modal;
