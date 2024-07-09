import React, { FC, useRef, useState } from 'react';
import Popup from '../ui/popup/Popup';
import Label from '../label/Label';
import DatePicker, { DatePickerResult } from './DatePicker';

export interface DateProps {
    id: string;
    value: string;
    onChange: (s: string) => void;
    label?: string | null;
    placeholder?: string | null;
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    required?: boolean | null;
    disabled?: boolean | null;
    __TYPE?: 'Date';
};

const Date: FC<DateProps> = ({ id, value, onChange, label, placeholder, top, bottom,
                               required = false, disabled = false }) => {
    
    const refInput = useRef<HTMLInputElement>(null);
    const [ isPickerOpen, setIsPickerOpen ] = useState(false);

    const isError = () => {
        if(required && !isValidDate(value)) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            caretColor:'var(--alxgrn-input-border-error)',
            borderColor:'var(--alxgrn-input-border-error)',
            backgroundColor:'var(--alxgrn-input-bg-error)',
        };
    };

    const onPickerChange = (date: DatePickerResult) => {
        const day = `0${date.day}`.slice(-2);
        const month = `0${date.month}`.slice(-2);
        const year = date.year;
        onChange(`${day}.${month}.${year}`);
    };

    return (
        <div className='FormItem'>
            <Label
                top={top}
                bottom={bottom}
                label={label}
                required={required}
                disabled={disabled}
                error={isError()}
            >
                <input
                    id={id}
                    ref={refInput}
                    type='text'
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder ?? /^ru\b/.test(navigator.language) ? 'ДД.ММ.ГГГГ' : 'DD.MM.YYYY'}
                    style={getStyle()}
                    disabled={disabled ? true : false}
                    onClick={() => setIsPickerOpen(true)}
                />
            </Label>
            <Popup
                parent={refInput}
                isOpen={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                horizontal='inner-left'
                margin='var(--alxgrn-unit-small)'
            >
                <DatePicker
                    year={value.split('.')[2]}
                    month={value.split('.')[1]}
                    day={value.split('.')[0]}
                    onChange={onPickerChange}
                />
            </Popup>
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
