import React from 'react';
import Popup, { PopupProps } from '../popup/Popup';
import './Menu.css';

export type TMenuSeparator = {
    id: number | string;
    separator: true;
    text?: never;
    icon?: never;
    disabled?: never;
}

export type TMenuAlternative = {
    id: number | string;
    separator?: never;
    text?: string;
    icon?: React.ReactNode;
    disabled?: boolean | null;
};

export type TMenuItem = TMenuAlternative|TMenuSeparator;

interface MenuProps extends PopupProps {
    items: TMenuItem[];
    onClick: (item: TMenuItem) => void;
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
                            onClick={() => { if(!item.disabled) onClick(item) }}
                        >
                            {item.icon && <span className='Icon'>{item.icon}</span>}
                            {item.text && <span className='Text'>{item.text}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
}

export default Menu;
