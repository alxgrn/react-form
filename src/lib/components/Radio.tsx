import { FC, useEffect, useState } from 'react';
import Label from './Label';

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
    onChange: (b: string) => void;
    hint?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    __TYPE?: string;
}

export const Radio: FC<RadioProps> = ({ id, value, onChange, hint, error, className,
                                        required = false, disabled = false, options }) => {

    const [ style, setStyle ] = useState(undefined);
    
    useEffect(() => {
        setStyle(undefined);
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) setStyle({ color:'var(--color-error)'} as any);
        }
    }, [ value, required, options ]);

    return (
        <div className='Form-item'>
            {options.map((item, index) => (
            <div className='Form-item' key={index}>
                <div className='Form-radio'>
                    <input
                        id={id + '-' + index}
                        name={id}
                        type='radio'
                        value={item.value}
                        checked={item.value === value}
                        onChange={(e) => onChange(e.target.value)}
                        className={className}
                        disabled={item.disabled || disabled}
                        required={item.required}
                    />
                    <Label
                        id={id + '-' + index}
                        label={item.label}
                        hint={item.hint}
                        error={item.error}
                        disabled={item.disabled || disabled}
                        required={item.required}
                        className={className}
                        style={style}
                    />
                </div>
            </div>))}

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
Radio.defaultProps = {
    __TYPE: 'Radio',
};

export default Radio;
