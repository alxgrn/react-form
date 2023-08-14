import React from 'react';
import './Button.css';

export interface ButtonProps {
    label?: string | null;
    type?: 'Error'|'Success'|'Accent'|'Default';
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
