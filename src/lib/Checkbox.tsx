import { FC } from 'react';
import Label from './Label';

export interface CheckboxProps {
    id: string;
    onChange: (b: boolean) => void;
    label: string;
    hint?: string;
    error?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    checked?: boolean;
    __TYPE?: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, onChange, label, hint, error, className,
                                       required = false, disabled = false, checked = false }) => {

    const getStyle = () => {
        if(required && !checked) {
            return { color:'var(--color-error)' };
        }
    };

    return (
        <div className='Form-item'>
            <div className='Form-checkbox'>
                <input
                    id={id}
                    type='checkbox'
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className={className}
                    disabled={disabled}
                />
                <Label
                    id={id}
                    label={label}
                    required={required}
                    hint={hint}
                    error={error}
                    style={getStyle()}
                    disabled={disabled}
                    className={className}
                />
            </div>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Checkbox.defaultProps = {
    __TYPE: 'Checkbox',
}

export default Checkbox;
