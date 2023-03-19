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
    __TYPE?: 'Date';
}

const Date: FC<DateProps> = ({ id, value, onChange, label, placeholder, top, bottom,
                               required = false, disabled = false }) => {
    
    const ref = useRef(null);
    const [ show, setShow ] = useState(false);
    // Используем useEffect а не onBlur т.к. если вешать setShow на него,
    // то при клике в DatePicker он будет скрываться раньше чем отработает
    // реакция на клик.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !(ref.current as any).contains(event.target)) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const isError = () => {
        if(required && !isValidDate(value)) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--color-error)',
            backgroundColor:'var(--background-error)',
        };
    };

    // Тут надо как-то скрыть DatePicker, но пока не понятно как
    // поэтому пока полагаемся на скрытие при клике вне компонента
    const onDatePickerClick = (value: string) => {
        onChange(value);
        //setShow(false);
    };

    return (
        <div ref={ref} className='FormItem FormDate'>
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
                onFocus={() => setShow(true)} 
            />

            <DatePicker value={value} onChange={onDatePickerClick} show={show}/>
        </LabelInput>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Date.defaultProps = {
    __TYPE: 'Date',
}

// Вспомогательная функция проверки того, что строка является
// корректной датой в формате ДД.ММ.ГГГ
export const isValidDate = (dateString: string): boolean => {
    // Проверим шаблон
    if(!dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) return false;
    // Парсим строку в элементы даты
    var parts = dateString.split('.');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    // Проверим диапазоны года и месяца
    if(year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    // Число дней в месяцах обычных лет
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // Корректировка февраля для високосных годов
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;
    // Теперь можно проверить диапазон дня и вернуть окончательный результат
    return day > 0 && day <= monthLength[month - 1];
};

export default Date;
