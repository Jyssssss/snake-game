import React, { useState, useEffect } from 'react';

import './Item.css';

const Item = (props) => {
    return (
        <div className={`item ${props.isSelected ? 'selected-item' : ''}`}>
            <span>{props.text}</span>
        </div>
    );
};

export default Item;