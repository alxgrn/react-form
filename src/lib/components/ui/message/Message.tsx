import React, { FC, ReactNode } from 'react';
import './Message.css';

export type MessageIconType = 'square' | 'round';

type Props = {
    icon?: string | null;
    type?: MessageIconType;
    title?: string | null;
    message: string | ReactNode;
};

const Message: FC<Props> = ({ icon, type = 'square', title, message }) => {

    return (
        <div className='Message'>
            {icon &&
            <img
                alt=''
                src={icon}
                className={`MessageIcon ${type}`}
            />}
            <div className='MessageText'>
                {title && <h1>{title}</h1>}
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Message;
