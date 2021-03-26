import React, { useState, useEffect } from 'react';
import Item from './Item';

import './Menu.css';

const Menu = (props) => {
    const menuItems = [{
        text: 'Start',
        action: props.viewHandler
    }, {
        text: 'Settings',
        action: () => { alert('No Settings right now.') }
    }, {
        text: 'Help',
        action: () => { alert('No Help right now.') }
    }];

    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const handleKeydown = e => {
            if (e.key === 'Enter') {
                menuItems[selected].action();
            } else {
                if (e.key === 'ArrowUp') {
                    if (selected === 0) return;
                    setSelected(s => s - 1);
                } else if (e.key === 'ArrowDown') {
                    if (selected === menuItems.length - 1) return;
                    setSelected(selected + 1);
                }
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });

    return (
        <div className='menu'>{
            menuItems.map((item, idx) => (
                <Item key={idx}
                    text={item.text}
                    isSelected={idx === selected}>
                </Item>))
        }
        </div>
    );
};

export default Menu;