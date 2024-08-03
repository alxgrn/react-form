import React from 'react';
import './Message.css';

export type MessageIconType = 'square' | 'round';

type Props = {
    icon?: string | null;
    type?: MessageIconType;
    title?: string | null;
    message: string | React.ReactNode;
};

const Message: React.FC<Props> = ({ icon, type = 'square', title, message }) => {

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
