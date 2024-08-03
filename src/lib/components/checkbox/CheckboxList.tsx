import React, { FC, useEffect, useState } from 'react';
import Fieldset from '../fieldset/Fieldset';
import Radio from '../radio/Radio';

export type CheckboxListValue = string | number;

export interface CheckboxListOption {
    label: string;
    value: CheckboxListValue;
    bottom?: string | null;
    checked?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
}

export interface CheckboxListProps {
    id: string;
    label?: string | null;
    options: CheckboxListOption[];
    onChange: (v: CheckboxListOption[]) => void;
    disabled?: boolean | null;
    required?: boolean | null;
    //__TYPE?: 'CheckboxList';
}

export const CheckboxList: FC<CheckboxListProps> = ({ id, label, onChange, required = false, disabled = false, options }) => {

    const [ error, setError ] = useState(false);

    // Если список отмечен как обязательный к выбору, мы проверяем что
    // у нас есть хотя бы один отмеченный пункт
    useEffect(() => {
        setError(false);
        if(required) {
            const index = options.findIndex(a => a.checked === true);
            if(index < 0) setError(true);
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
            label={label}
            error={error}
            disabled={disabled}
            required={required}
        >
            {options.map((item, index) => (
                <Radio
                    key={index}
                    type='checkbox'
                    error={error}
                    label={item.label}
                    value={item.value}
                    bottom={item.bottom}
                    disabled={item.disabled || disabled}
                    required={item.required}
                    checked={item.checked}
                    onChange={(checked) => onChangeValue(index, checked)}
                />))}
        </Fieldset>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// CheckboxList.defaultProps = {
//     __TYPE: 'CheckboxList',
// };

export default CheckboxList;
