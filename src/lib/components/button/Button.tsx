import React from 'react';
import './Button.css';

export type ButtonType = 'Error'|'Success'|'Accent'|'Default';
export type ButtonSize = 'Normal'|'Small';
export interface ButtonProps {
    label?: string | null;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean | null;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, type = 'Default', size = 'Normal', disabled = false, onClick }) => (
    <span
        className={disabled ? `Button ${type} ${size} Disabled` : `Button ${type} ${size}`}
        onClick={() => { if(onClick && !disabled) onClick() }}
    >
        {label && label}
    </span>
);

export default Button;
