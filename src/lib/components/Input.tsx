import React, { FC } from 'react';
import LabelInput from './LabelInput';

export interface InputProps {
    id: string;
    type?: 'text' | 'password' | 'textarea';
    value: string;
    onChange: (s: string) => void;
    label?: string;
    placeholder?: string;
    top?: string;
    bottom?: string;
    required?: boolean;
    disabled?: boolean;
    limit?: number;
    rows?: number;
    __TYPE?: string;
}

const Input: FC<InputProps> = ({ id, type = 'text', value, onChange, label, 
                                placeholder, rows = 5, top, bottom,
                                required = false, disabled = false, limit }) => {

    const isError = () => {
        if(required && !value.trim().length) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--color-error)',
            backgroundColor:'var(--background-error)',
        };
    };

    const doChange = (value: string) => {
        if(limit) value = value.substring(0, limit);
        onChange(value);
    };

    return (
        <div className='Form-item'>
        <LabelInput
            top={top}
            bottom={bottom}
            label={label}
            required={required}
            disabled={disabled}
            failed={isError()}
        >

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

        </LabelInput>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Input.defaultProps = {
    __TYPE: 'Input',
}

export default Input;
