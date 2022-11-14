import React, { FC } from 'react';
import Label from './Label';

export interface SelectOption {
    option: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    id: string;
    value: string;
    options: SelectOption[];
    onChange: (b: string) => void;
    label?: string;
    hint?: string;
    error?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    checked?: boolean;
    __TYPE?: string;
}

export const Select: FC<SelectProps> = ({ id, value, onChange, label, placeholder,
                                          hint, required, disabled, error, options }) => {

    const isError = () => {
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) return true;
        }
        return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--color-error)',
            backgroundColor:'var(--background-error)',
        };
    };

    const getWrapStyle = () => {
        let style = 'select-wrap';
        if(disabled) style += ' disabled';
        if(isError()) style += ' failed';
        return style;
    };

    return (
        <div className='Form-item'>
            <Label
                id={id}
                label={label}
                required={required}
                disabled={disabled}
                failed={isError()}
            />
            <div className={getWrapStyle()}>
                <select
                    id={id}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={getStyle()}
                    disabled={disabled}
                >
                    {placeholder && <option>{placeholder}</option>}
                    {options.map((item, index) => (
                        <option
                            key={index}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {item.option}
                        </option>
                    ))}
                </select>
            </div>

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
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Select.defaultProps = {
    __TYPE: 'Select',
};

export default Select;
