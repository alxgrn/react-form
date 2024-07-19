import React from 'react';
import './Button.css';

export type ButtonType = 'Error'|'Success'|'Accent'|'Default';
export interface ButtonProps {
    label?: string | null;
    type?: ButtonType;
    disabled?: boolean | null;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, type = 'Default', disabled = false, onClick }) => (
    <span
        className={disabled ? `Button ${type} Disabled` : `Button ${type}`}
        onClick={() => { if(onClick && !disabled) onClick() }}
    >
        {label && label}
    </span>
);

export default Button;
