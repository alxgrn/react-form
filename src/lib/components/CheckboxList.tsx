import React, { FC, useEffect, useState } from 'react';
import LabelRadio from './LabelRadio';
import Fieldset from './Fieldset';

export type CheckboxListValue = string | number;

export interface CheckboxListOption {
    label: string;
    value: CheckboxListValue;
    hint?: string | null;
    checked?: boolean | null;
    disabled?: boolean | null;
}

export interface CheckboxListProps {
    id: string;
    label?: string | null;
    options: CheckboxListOption[];
    onChange: (v: CheckboxListOption[]) => void;
    disabled?: boolean | null;
    required?: boolean | null;
    __TYPE?: 'CheckboxList';
}

export const CheckboxList: FC<CheckboxListProps> = ({ id, label, onChange, required = false, disabled = false, options }) => {

    const [ failed, setFailed ] = useState(false);

    // Если список отмечен как обязательный к выбору, мы проверяем что
    // у нас есть хотя бы один отмеченный пункт
    useEffect(() => {
        setFailed(false);
        if(required) {
            const index = options.findIndex(a => a.checked === true);
            if(index < 0) setFailed(true);
        }
    }, [ required, options ]);

    // При изменении выбора вызываем callback с новым набором опций
    const onChangeValue = (index: number, checked: boolean) => {
        const newOptions = [...options];
        newOptions[index].checked = checked;
        onChange(newOptions);
    };

    return (
        <Fieldset
            legend={label}
            failed={failed}
            disabled={disabled}
            required={required}
        >
            {options.map((item, index) => (
                <div className='FormItem' key={index}>
                    <LabelRadio
                        label={item.label}
                        hint={item.hint}
                        failed={failed}
                        disabled={item.disabled || disabled}
                        checked={item.checked}
                    >
                        <input
                            id={`${id}-${index}`}
                            type='checkbox'
                            checked={item.checked ? true : false}
                            disabled={(item.disabled || disabled) ? true : false}
                            onChange={(e) => onChangeValue(index, e.target.checked)}
                        />
                    </LabelRadio>
                </div>
            ))}
        </Fieldset>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
CheckboxList.defaultProps = {
    __TYPE: 'CheckboxList',
};

export default CheckboxList;
