import React, { FC, useRef, useState, useEffect } from 'react';
import LabelInput from './LabelInput';
import './Date.css';
import DatePicker from './DatePicker';

export interface DateProps {
    id: string;
    value: string;
    onChange: (s: string) => void;
    label?: string | null;
    placeholder?: string | null;
    top?: string | null;
    bottom?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
    __TYPE?: string;
}

const Date: FC<DateProps> = ({ id, value, onChange, label, placeholder, top, bottom,
                               required = false, disabled = false }) => {
    
    const ref = useRef(null);
    const [ focus, setFocus ] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !(ref.current as any).contains(event.target)) {
                setFocus(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const isError = () => {
        if(required && !value.trim().length) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--color-error)',
            backgroundColor:'var(--background-error)',
        };
    };

    const onDatePickerClick = (value: string) => {
        onChange(value);
    };

    return (
        <div ref={ref} className='Form-item Form-date'>
        <LabelInput
            top={top}
            bottom={bottom}
            label={label}
            required={required}
            disabled={disabled}
            failed={isError()}
        >
            
            <input
                id={id}
                type='text'
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder ?? undefined}
                style={getStyle()}
                disabled={disabled ? true : false}
                onFocus={e => setFocus(true)}
                
            />

            <DatePicker value={value} onChange={onDatePickerClick} show={focus}/>
        </LabelInput>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Date.defaultProps = {
    __TYPE: 'Date',
}

export default Date;
