import React, { FC } from 'react';
import LabelRadio from './LabelRadio';

export interface CheckboxProps {
    id: string;
    onChange: (b: boolean) => void;
    label: string;
    hint?: string | null;
    error?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
    checked?: boolean | null;
    __TYPE?: 'Checkbox';
}

const Checkbox: FC<CheckboxProps> = ({ id, onChange, label, hint, error,
                                       required = false, disabled = false, checked = false }) => {

    return (
        <div className='FormItem'>
            <LabelRadio
                label={label}
                required={required}
                hint={hint}
                error={error}
                failed={required && !checked}
                disabled={disabled}
                checked={checked}
            >
                <input
                    id={id}
                    type='checkbox'
                    checked={checked ? true : false}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled ? true : false}
                />
            </LabelRadio>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Checkbox.defaultProps = {
    __TYPE: 'Checkbox',
}

export default Checkbox;
