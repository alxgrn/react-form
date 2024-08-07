import React from 'react';
import Label from '../label/Label';
import './Select.css';

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
    label?: string | null;
    top?: string | null;
    bottom?: string | null;
    placeholder?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
    //__TYPE?: 'Select';
}

export const Select: React.FC<SelectProps> = ({ id, value, onChange, label, placeholder,
                                                top, required = false, disabled = false,
                                                bottom, options }) => {

    const isError = () => {
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) return true;
        }
        return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--alxgrn-input-border-error)',
            backgroundColor:'var(--alxgrn-input-bg-error)',
        };
    };

    const getWrapStyle = () => {
        let style = 'SelectWrap';
        if(disabled) style += ' Disabled';
        if(isError()) style += ' Error';
        return style;
    };

    return (
        <div className='FormItem'>
            <Label
                top={top}
                bottom={bottom}
                label={label}
                required={required}
                disabled={disabled}
                error={isError()}
            >
                <div className={getWrapStyle()}>
                    <select
                        id={id}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        style={getStyle()}
                        disabled={disabled ? true : false}
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
            </Label>
        </div>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Select.defaultProps = {
//     __TYPE: 'Select',
// };

export default Select;
