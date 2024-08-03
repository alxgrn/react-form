import React, { useEffect, useState } from 'react';
import './DatePicker.css';
/**
 * Компонент отображающий календарь
 */
export type DatePickerResult = {
    year: number;
    month: number;
    day: number;
};

export type DatePickerProps = {
    year?: number | string;
    month?: number | string; // месяц от 1 до 12, но внутри компонента используется от 0 до 11
    day?: number | string;
    onChange?: (result: DatePickerResult) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ year, month, day, onChange }) => {
    const monthName = getLocalMonthNames();
    const currentDate = new Date(); // Текущая дата устройства пользователя
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const [ displayedYear, setDisplayedYear ] = useState(currentYear);
    const [ displayedMonth, setDisplayedMonth ] = useState(currentMonth);
    const [ days, setDays ] = useState<number[]>([]);
    const [ selectedDay, setSelectedDay ] = useState(0);
    const [ selectedMonth, setSelectedMonth ] = useState(0);
    const [ selectedYear, setSelectedYear ] = useState(0);

    // При изменении начального значения мы пытаемся его разобрать
    // полагаясь на встроенную автокоррекцию даты. Если часть даты
    // не задана, мы используем текущие значения.
    useEffect(() => {
        let y = year, m = month, d = day;

        if(typeof y === 'string') y = parseInt(y);
        if(typeof m === 'string') m = parseInt(m);
        if(typeof d === 'string') d = parseInt(d);

        if(y !== undefined && isNaN(y)) y = currentYear;
        if(m !== undefined && isNaN(m)) m = currentMonth;
        if(d !== undefined && isNaN(d)) d = currentDay;

        const date = new Date(y ?? currentYear, m ? m - 1 : currentMonth, d ?? currentDay);

        setDisplayedYear(date.getFullYear());
        setDisplayedMonth(date.getMonth());
        setSelectedDay(date.getDate());
        setSelectedMonth(date.getMonth());
        setSelectedYear(date.getFullYear());
    }, [ year, month, day, currentYear, currentMonth, currentDay ]);

    // При изменении месяца и/или года надо менять отображение календаря
    useEffect(() => {
        const dim = daysInMonth(displayedMonth, displayedYear);
        let skip = new Date(displayedYear, displayedMonth, 1).getDay();
        if(skip === 0) skip = 7; // корректируем день недели (нумеруется с 0 - воскресенье)
        const days = [];
        for(let i = 1; i < skip; i ++) days.push(0);
        for(let i = 1; i <= dim; i ++) days.push(i);
        setDays(days);
    }, [ displayedMonth, displayedYear ]);

    // Перебираем месяц по кругу
    const changeMonth = (step: -1 | 1) => {
        let m = displayedMonth + step;
        if(m < 0) m = 11;
        if(m > 11) m = 0;
        setDisplayedMonth(m);
    };

    // При клике на день мы вызываем callback т.к. дата полностью выбрана
    const changeDay = (day: number) => {
        if(!day) return; // Клик на пустышку для отображения сдвига начала месяца
        setSelectedDay(day);
        setSelectedMonth(displayedMonth);
        setSelectedYear(displayedYear);
        if(onChange) onChange({ day, month: displayedMonth + 1, year: displayedYear });
    };

    // При рендере ячейки с днем её надо красить в разные цвета
    const getClassName = (day: number): string | undefined => {
        if(!day) return 'Empty'; // Пустышка для сдвига начала месяца
        if(day === selectedDay && displayedMonth === selectedMonth && displayedYear === selectedYear) return 'Selected'; // Выбранный день
        if(day === currentDay && displayedMonth === currentMonth && displayedYear === currentYear) return 'Current'; // Текущий день
        return undefined; // Обычная клетка
    };

    return (
        <div className='FormDatePicker'>
            <div className='FormDatePickerMenu'>
                <span className='FormDatePickerPrev' onClick={() => changeMonth(-1)}>&laquo;</span>
                <span className='FormDatePickerText'>{monthName[displayedMonth]}</span>
                <span className='FormDatePickerNext' onClick={() => changeMonth(1)}>&raquo;</span>
            </div>
            <div className='FormDatePickerDays'>
                {days.map((day, index) => (
                    <span
                        key={index}
                        className={getClassName(day)}
                        onClick={() => changeDay(day)}
                    >
                        {day ? day : ''}
                    </span>
                ))}
            </div>
            <div className='FormDatePickerMenu'>
                <span className='FormDatePickerPrev' onClick={() => setDisplayedYear(displayedYear - 1)}>&laquo;</span>
                <span className='FormDatePickerText'>{displayedYear}</span>
                <span className='FormDatePickerNext' onClick={() => setDisplayedYear(displayedYear + 1)}>&raquo;</span>
            </div>
        </div>
    );
};

// Возвращает число дней в месяце
const daysInMonth = (month: number, year: number) => {
    // Если в качестве дня указать 0, Date вернет последний день предыдущего месяца.
    // Поэтому для получения числа дней в текущем месяце мы берем следующий месяц.
    // Автоисправление даты позаботится если на входе будет 11 месяц.
    return new Date(year, month + 1, 0).getDate();
};

// Возвращает массив названий месяцев в соответствии с текущей локалью пользователя
const getLocalMonthNames = () => {
    let d = new Date(2000, 0); // January
    let months = [];
    for(let i = 0; i < 12; i ++) {
        months.push(d.toLocaleString('default', { month: 'long' }));
        d.setMonth(i + 1);
    }
    return months;
};

export default DatePicker;
