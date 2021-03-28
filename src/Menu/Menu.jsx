import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../Modal/Modal';
import Item from './Item';

import './Menu.css';

const MenuType = {
    Main: 'MAIN',
    Settings: 'SETTINGS'
}

const Menu = (props) => {
    const getMainItems = useCallback((isOpen) => [{
        text: 'Start',
        action: props.viewHandler
    }, {
        text: 'Settings',
        action: () => {
            setMenuType(MenuType.Settings);
            setSelected(0);
        }
    }, {
        text: 'Help',
        action: () => setIsHelpOpen(!isOpen)
    }], [props.viewHandler]);

    const getSettingItems = useCallback(() => [...props.settingItems, {
        text: 'Done',
        action: () => {
            setMenuType(MenuType.Main);
            setSelected(1);
        }
    }], [props.settingItems]);

    const [selected, setSelected] = useState(0);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [menuType, setMenuType] = useState(MenuType.Main);
    const [mainItems, setMainItems] = useState(getMainItems(isHelpOpen));
    const [settingItems,] = useState(getSettingItems());

    useEffect(() => {
        setMainItems(getMainItems(isHelpOpen));
    }, [getMainItems, isHelpOpen]);

    useEffect(() => {
        const handleKeydown = e => {
            const items = menuType === MenuType.Main ? mainItems : settingItems
            if (e.key === 'Enter') {
                items[selected].action();
            } else if (!isHelpOpen) {
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
    }, [selected, menuType, mainItems, settingItems, isHelpOpen]);

    return (
        <>
            <div className='menu'>{
                (menuType === MenuType.Main ? mainItems : settingItems).map((item, idx) => (
                    <Item key={`${idx}_${props.currentSettingIdxs[idx]}`}
                        text={item.text}
                        values={item.values}
                        current={props.currentSettingIdxs[idx]}
                        action={item.action}
                        isSelected={idx === selected}>
                    </Item>))
            }
            </div>
            <Modal isOpen={isHelpOpen}>
                <div>
                    <br></br>
                    <h3>1. Use Arrow Keys to move.</h3>
                    <h3>2. Press ENTER to Pause.</h3>
                    <h3>3. Press ESC to End.</h3>
                    <br></br>
                </div>
            </Modal>
        </>
    );
};

export default Menu;