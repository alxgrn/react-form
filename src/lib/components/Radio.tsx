import React, { Fragment, FC, useEffect, useState } from 'react';
import LabelRadio from './LabelRadio';

export interface RadioOption {
    label: string;
    value: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

export interface RadioProps {
    id: string;
    value: string;
    options: RadioOption[];
    onChange: (s: string) => void;
    disabled?: boolean;
    required?: boolean;
    __TYPE?: string;
}

export const Radio: FC<RadioProps> = ({ id, value, onChange, required = false, disabled = false, options }) => {

    const [ failed, setFailed ] = useState(false);
    
    useEffect(() => {
        setFailed(false);
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) setFailed(true);
        }
    }, [ value, required, options ]);

    return (
        <Fragment>
            {options.map((item, index) => (
            <div className='Form-item' key={index}>
                <LabelRadio
                    label={item.label}
                    hint={item.hint}
                    error={item.error}
                    disabled={item.disabled || disabled}
                    required={item.required}
                    failed={failed}
                    checked={item.value === value}
                >
                    <input
                        id={id + '-' + index}
                        name={id}
                        type='radio'
                        value={item.value}
                        checked={item.value === value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={item.disabled || disabled}
                        required={item.required}
                    />
                </LabelRadio>
            </div>))}
        </Fragment>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Radio.defaultProps = {
    __TYPE: 'Radio',
};

export default Radio;
