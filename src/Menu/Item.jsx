import React, { useState, useEffect } from 'react';

import './Menu.css';

const Item = (props) => {
    const [curIdx,] = useState(props.current ?? 0);

    useEffect(() => {
        const handleKeydown = e => {
            if (props.isSelected && props.values) {
                if (e.key === 'ArrowLeft') {
                    if (curIdx === 0) return;
                    props.action(curIdx - 1);
                } else if (e.key === 'ArrowRight') {
                    if (curIdx === props.values.length - 1) return;
                    props.action(curIdx + 1);
                }
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [curIdx, props]);

    return (
        props.values === undefined ?
            <div className={`item ${props.isSelected ? 'selected-item' : ''}`}>
                <span>{props.text}</span>
            </div> :
            <div className={`item value-item ${props.isSelected ? 'selected-item' : ''}`}>
                <div className="value-item-cell">
                    <span>{props.text}</span>
                </div>
                <div className="value-item-cell">
                    <div className={props.isSelected && curIdx > 0 ? 'arrow-left' : ''}></div>
                    <span className="value-item-value">{props.values[curIdx].text}</span>
                    <div className={props.isSelected && curIdx < props.values.length - 1 ? 'arrow-right' : ''}></div>
                </div>
            </div>
    );
};

export default Item;