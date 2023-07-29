import React, { FC } from 'react';

export interface ButtonProps {
    label?: string | null;
    type?: 'Submit'|'Error'|'Success'|'Cancel';
    disabled?: boolean | null;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ label, type = 'Submit', disabled = false, onClick }) => {
    return (
        <span
            className={disabled ? `Button ${type} disabled` : `Button ${type}`}
            onClick={() => { if(onClick) onClick() }}
        >
            {label && label}
        </span>
    );
}

export default Button;
