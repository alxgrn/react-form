import React, { FC, useEffect, useState } from 'react';
import Radio from './Radio';
import Fieldset from '../fieldset/Fieldset';
/**
 * Список из Radio-элементов.
 * По сути это аналог Select, но представленный в виде Radio.
 */
export type RadioListValue = string | number;

export interface RadioListOption {
    label: string;
    value: RadioListValue;
    bottom?: string | null;
    disabled?: boolean | null;
    required?: boolean | null;
}

export interface RadioListProps {
    id: string;
    label?: string | null;
    value: RadioListValue;
    options: RadioListOption[];
    onChange: (value: RadioListValue) => void;
    disabled?: boolean | null;
    required?: boolean | null;
    __TYPE?: 'RadioList';
}

export const RadioList: FC<RadioListProps> = ({ id, label, value, onChange, required = false, disabled = false, options }) => {

    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        setError(false);
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) setError(true);
        }
    }, [ value, required, options ]);

    return (
        <Fieldset
            label={label}
            error={error}
            disabled={disabled}
            required={required}
        >
            {options.map((item, index) => (
                <Radio
                    key={index}
                    label={item.label}
                    value={item.value}
                    error={error}
                    bottom={item.bottom}
                    disabled={item.disabled || disabled}
                    required={item.required}
                    checked={item.value === value}
                    onChange={(checked, value) => onChange(value)}
                />))}
        </Fieldset>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
RadioList.defaultProps = {
    __TYPE: 'RadioList',
};

export default RadioList;
