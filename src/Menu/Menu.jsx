import React, { useState, useEffect } from 'react';
import Item from './Item';

import './Menu.css';

const Menu = (props) => {
    const menuItems = [{
        text: 'Start',
        action: props.viewHandler
    }, {
        text: 'Settings',
        action: () => {
            setItems(settingItems);
            setSelected(0);
        }
    }, {
        text: 'Help',
        action: () => { alert('1. Use Arrow Keys to move. \n2. Press ENTER to Pause. \n3. Press ESC to End. ') }
    }];

    const settingItems = [...props.settingItems, {
        text: 'Done',
        action: () => {
            setItems(menuItems);
            setSelected(1);
        }
    }];

    const [selected, setSelected] = useState(0);
    const [items, setItems] = useState(menuItems);

    useEffect(() => {
        const handleKeydown = e => {
            if (e.key === 'Enter') {
                items[selected].action();
            } else {
                if (e.key === 'ArrowUp') {
                    if (selected === 0) return;
                    setSelected(s => s - 1);
                } else if (e.key === 'ArrowDown') {
                    if (selected === items.length - 1) return;
                    setSelected(selected + 1);
                }
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [items, selected]);

    return (
        <div className='menu'>{
            items.map((item, idx) => (
                <Item key={`${idx} ${props.currentSettingIdxs[idx]}`}
                    text={item.text}
                    values={item.values}
                    current={props.currentSettingIdxs[idx]}
                    action={item.action}
                    isSelected={idx === selected}>
                </Item>))
        }
        </div>
    );
};

export default Menu;