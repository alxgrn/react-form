import React, { FC } from 'react';
import Label from './Label';

export interface InputProps {
    id: string;
    type?: 'text' | 'password' | 'textarea';
    value: string;
    onChange: (s: string) => void;
    label?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    limit?: number;
    rows?: number;
    __TYPE?: string;
}

const Input: FC<InputProps> = ({ id, type = 'text', value, onChange, label, 
                                placeholder, rows = 5, hint, error,
                                required = false, disabled = false, limit }) => {

    const getStyle = () => {
        if(required && !value.trim().length) {
            return {
                borderColor:'var(--color-error)',
                backgroundColor:'var(--background-error)',
            };
        }
    };

    const getLabelStyle = () => {
        if(required && !value.trim().length) {
            return {
                color:'var(--color-error)',
            };
        }
    };

    const doChange = (value: string) => {
        if(limit) value = value.substring(0, limit);
        onChange(value);
    };

    return (
        <div className='Form-item'>
            <Label
                id={id}
                label={label}
                required={required}
                disabled={disabled}
                style={getLabelStyle()}
            />

            {/* TEXT or PASSWORD */}
            {(type === 'text' || type === 'password') &&
            <input
                id={id}
                type={type}
                value={value}
                onChange={e => doChange(e.target.value)}
                placeholder={placeholder}
                style={getStyle()}
                disabled={disabled}
            />}

            {/* TEXTAREA */}
            {type === 'textarea' &&
            <textarea
                id={id}
                rows={rows}
                value={value}
                onChange={(e) => doChange(e.target.value)}
                placeholder={placeholder}
                style={getStyle()}
                disabled={disabled}
            />}

            {error &&
            <div className='Form-item-error'>
                {error}
            </div>}

            {hint &&
            <div className='Form-item-hint'>
                {hint}
            </div>}
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Input.defaultProps = {
    __TYPE: 'Input',
}

export default Input;
