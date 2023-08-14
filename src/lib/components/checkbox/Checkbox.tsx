import React from 'react';
import Radio, { RadioProps } from '../radio/Radio';

export interface CheckboxProps extends Omit<RadioProps, '__TYPE' | 'type'> {
    id: string;
    __TYPE?: 'Checkbox';
};

const Checkbox: React.FC<CheckboxProps> = ({ id, value, onChange, label, bottom,
                                             required = false, disabled = false, checked = false }) => (
    <div className='FormItem'>
        <Radio
            type='checkbox'
            label={label}
            value={value}
            bottom={bottom}
            required={required}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
        />
    </div>
);

// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Checkbox.defaultProps = {
    __TYPE: 'Checkbox',
};

export default Checkbox;
