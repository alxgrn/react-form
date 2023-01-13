import React, { FC, useEffect, useState } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
    value?: string; // DD.MM.YYYY
    show?: boolean;
    onChange?: (value: string) => void;
}
// Если в качестве дня указать 0, Date вернет последний день предыдущего месяца.
// Поэтому для получения числа дней в текущем месяце мы берем следующий месяц.
// Автоисправление даты позаботится если на входе будет 11 месяц.
const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
}
// Возвращает массив названий месяцев в соответствии с текущей локалью пользователя.
const getLocalMonthNames = () => {
    let d = new Date(2000, 0); // January
    let months = [];
    for(let i = 0; i < 12; i ++) {
        months.push(d.toLocaleString('default', { month: 'long' }));
        d.setMonth(i + 1);
    }
    return months;
}
// Возвращает двузначное число с ведущим нулем
const getZeroPadNumber = (n: number) => {
    return ('0' + n).slice(-2);
}


const DatePicker: FC<DatePickerProps> = ({ value, show = false, onChange }) => {
    const monthName = getLocalMonthNames();
    const currentDate = new Date(); // Текущая дата устройства пользователя
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const [ year, setYear ] = useState(0);
    const [ month, setMonth ] = useState(0);
    const [ days, setDays ] = useState<number[]>([]);
    const [ selectedDay, setSelectedDay ] = useState(0);
    const [ selectedMonth, setSelectedMonth ] = useState(0);
    const [ selectedYear, setSelectedYear ] = useState(0);

    // При изменении начального значения мы пытаемся его разобрать
    // полагаясь на встроенную автокоррекцию даты.
    useEffect(() => {
        if(value?.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            const [ day, month, year ] = value.split('.');
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            setYear(date.getFullYear());
            setMonth(date.getMonth());
            setSelectedDay(date.getDate());
            setSelectedMonth(date.getMonth());
            setSelectedYear(date.getFullYear());
        }
    }, [ value ]);

    // При изменении месяца и/или года надо менять отображение календаря
    useEffect(() => {
        const dim = daysInMonth(month, year);
        let skip = new Date(year, month, 1).getDay();
        if(skip === 0) skip = 7; // корректируем день недели (нумеруется с 0 - воскресенье)
        const days = [];
        for(let i = 1; i < skip; i ++) days.push(0);
        for(let i = 1; i <= dim; i ++) days.push(i);
        setDays(days);
    }, [ month, year ]);

    // Перебираем месяц по кругу
    const changeMonth = (step: -1 | 1) => {
        let m = month + step;
        if(m < 0) m = 11;
        if(m > 11) m = 0;
        setMonth(m);
    };

    // При клике на день мы вызываем callback т.к. дата полностью выбрана
    const changeDay = (day: number) => {
        if(!day) return; // Клик на пустышку для сдвига начала месяца
        setSelectedDay(day);
        setSelectedMonth(month);
        setSelectedYear(year);
        if(onChange) onChange(getZeroPadNumber(day) + '.' + getZeroPadNumber(month + 1) + '.' + year);
    };

    // При рендере ячейки с днем её надо красить в разные цвета
    const getClassName = (day: number) => {
        if(!day) return 'empty'; // Пустышка для сдвига начала месяца
        if(day === selectedDay && month === selectedMonth && year === selectedYear) return 'selected'; // Выбранный день
        if(day === currentDay && month === currentMonth && year === currentYear) return 'current'; // Текущий день
        return ''; // Обычная клетка
    };

    if(!show) return null;

    return (
        <div className='Form-datepicker'>
            <div className='Form-datepicker-menu'>
                <span className='Form-datepicker-prev' onClick={e => changeMonth(-1)}>&laquo;</span>
                <span className='Form-datepicker-text'>{monthName[month]}</span>
                <span className='Form-datepicker-next' onClick={e => changeMonth(1)}>&raquo;</span>
            </div>
            <div className='Form-datepicker-days'>
                {days.map((day, index) => (
                    <span
                        key={index}
                        className={getClassName(day)}
                        onClick={e => changeDay(day)}
                    >
                        {day ? day : ''}
                    </span>
                ))}
            </div>
            <div className='Form-datepicker-menu'>
                <span className='Form-datepicker-prev' onClick={e => setYear(year - 1)}>&laquo;</span>
                <span className='Form-datepicker-text'>{year}</span>
                <span className='Form-datepicker-next' onClick={e => setYear(year + 1)}>&raquo;</span>
            </div>
        </div>
    );
}

export default DatePicker;
