import React from 'react';
import RadioLabel from './RadioLabel';
/**
 * Одиночный radio-элемент не имеет особого смысла, но он
 * используется как базовый и для checkbox. Также на его основе
 * работает списочный элемент RadioList.
 * Суть работы состоит в следующем: элементу передается значение
 * value которое возвращается в функции onChange вместе со статусом
 * отметки элемента.
 */
export interface RadioProps {
    type?: 'radio' | 'checkbox';
    value: string | number;
    error?: boolean;
    onChange: (checked: boolean, value: string | number) => void;
    label?: string | null;
    bottom?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
    checked?: boolean | null;
    //__TYPE?: 'Radio';
};

export const Radio: React.FC<RadioProps> = ({ type = 'radio', value, onChange, label, bottom, error = false,
                                              required = false, disabled = false, checked = false }) => {

    return (
        <RadioLabel
            label={label}
            bottom={bottom}
            required={required ? true : false}
            error={error || (required && !checked)}
            disabled={disabled ? true : false}
            checked={checked ? true : false}
        >
            <input
                type={type}
                onChange={(e) => onChange(e.target.checked, value)}
                checked={checked ? true : false}
                disabled={disabled ? true : false}
                required={required ? true : false}
            />
        </RadioLabel>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Radio.defaultProps = {
//     __TYPE: 'Radio',
// };

export default Radio;
