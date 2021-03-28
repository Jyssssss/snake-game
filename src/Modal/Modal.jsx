import React from 'react';

import './Modal.css';

const Modal = (props) => {

    return (
        props.isOpen &&
        <div className='modal'>
            <div className='modal-content'>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;