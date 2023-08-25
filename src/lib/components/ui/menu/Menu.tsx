import React from 'react';
import Popup, { PopupProps } from '../popup/Popup';
import './Menu.css';

export type MenuSeparator = {
    id?: never;
    separator: true;
    text?: never;
    icon?: never;
    disabled?: never;
}

export type MenuAlternative = {
    id: number | string;
    separator?: never;
    text?: string;
    icon?: React.ReactNode;
    disabled?: boolean | null;
};

export type MenuItem = MenuAlternative | MenuSeparator;

interface MenuProps extends PopupProps {
    items: MenuItem[];
    onClick: (item: MenuItem) => void;
};

export const Menu: React.FC<MenuProps> = (props) => {
    const { items, onClick, ...popupProps } = props;

    return (
        <Popup {...popupProps}>
            <div className='Menu'>
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`${item.separator ? 'Separator' : ''} ${item.disabled ? 'Disabled' : ''}`}
                            onClick={() => { if(!item.disabled && !item.separator) onClick(item) }}
                        >
                            {!item.separator && <>
                                {item.icon && <span className='Icon'>{item.icon}</span>}
                                {item.text && <span className='Text'>{item.text}</span>}
                            </>}
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
}

export default Menu;
