import React, { FC, useRef, useState, useEffect } from 'react';
import Label from './label/Label';
import './Date.css';
import DatePicker from './DatePicker';

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
}

const Date: FC<DateProps> = ({ id, value, onChange, label, placeholder, top, bottom,
                               required = false, disabled = false }) => {
    
    const ref = useRef<HTMLDivElement>(null);
    const refInput = useRef<HTMLInputElement>(null);
    const [ show, setShow ] = useState(false);

    // Скрываем DatePicker при клике вне компонента.
    // Используем useEffect а не onBlur т.к. если вешать setShow на него,
    // то при клике в DatePicker он будет скрываться раньше чем отработает
    // реакция на клик.
    // Используем нисходящее событие, а не восходящее!
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

    // Показываем/скрываем DatePicker при кликах внутри компонента.
    // Скрываем если кликнули на день в календаре, а показываем во
    // всех остальных случаях.
    const onClick = (event: React.MouseEvent) => {
        if(disabled) return;
        if((event.target as Element).classList.contains('FormDatePickerDay')) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    // Скрываем DatePicker по Esc и Enter
    useEffect(() => {
        const closeOnEscapeOrEnterKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape' || e.key === 'Enter') setShow(false);
        };
        document.body.addEventListener("keydown", closeOnEscapeOrEnterKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeOrEnterKey);
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

    // DatePicker рендерим под строкой ввода, для этого
    // надо вычислить его позицию т.к. просто статически сверстать
    // расположение в CSS мы не можем из-за того, что под строкой
    // ввода может быть еще элемент bottom.
    const getTopPosition = () => {
        if(refInput.current) {
            return refInput.current.offsetTop + refInput.current.offsetHeight;
        } else {
            return undefined;
        }
    };

    return (
        <div ref={ref} className='FormItem FormDate' onClick={onClick}>
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
                    type='text'
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder ?? /^ru\b/.test(navigator.language) ? 'ДД.ММ.ГГГГ' : 'DD.MM.YYYY'}
                    style={getStyle()}
                    disabled={disabled ? true : false}
                    ref={refInput}
                />
            </Label>
            {/*
                Располагаем DatePicker вне LabelInput т.к. иначе не удасться остановить
                всплытие клика внутри календаря и будет невозможно его скрытие при клике
                на дне месяца. Клик внутри label всегда ведет к клику в привязанном input.
            */}
            <DatePicker value={value} onChange={onChange} show={show} top={getTopPosition()}/>
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
