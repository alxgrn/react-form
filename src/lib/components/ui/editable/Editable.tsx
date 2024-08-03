import React, { FC, useEffect, useRef, useState } from 'react';
import './Editable.css';

type Props = {
    value: string;
    empty?: boolean; // Разрешать пустой ввод?
    onblur?: 'Enter' | 'Esc'; // Реагировать на потерю фокуса как на нажатие Enter или Esc
    newline?: boolean; // Разрешить перевод строки?
    placeholder?: string; // Текст заглушки
    onChange: (value: string) => void;
}

const Editable: FC<Props> = ({ value, empty, newline, onblur = 'Enter', placeholder, onChange }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [ isActive, setIsActive ] = useState(false);
    const [ innerValue, setInnerValue ] = useState(newline ? value : value.replace(/[\n\r]+/g, ' '));

    // Отслеживаем нажатие ESC для отмены ввода
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                setIsActive(false);
                setInnerValue(value);
            }
        };

        if (isActive) document.body.addEventListener('keydown', closeOnEscapeKey);
        
        return () => {
            if (isActive) document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [ isActive, value ]);

    // Подгоняем размер поля ввода под содержание
    useEffect(() => {
        if (!isActive || !ref.current) return;
        ref.current.style.height = '0px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, [ isActive, innerValue ]);

    // Завершение ввода
    const finishInput = () => {
        var newValue = innerValue.trim();
        if (!newValue && !empty) newValue = value;
        setIsActive(false);
        onChange(newValue);
    };

    // Завершаем редактирование при нажатии на Enter
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            finishInput();
        }
    };

    // В зависимости от установок разрешаем или запрещаем использование перевода строки
    const onInnerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInnerValue(newline ? e.target.value : e.target.value.replace(/[\n\r]+/g, ' '))
    };

    // Обработчик потери фокуса
    const onBlur = () => {
        if (onblur === 'Enter') {
            // Как при нажатии на Enter
            finishInput();
        } else {
            // Как при нажатии на Esc
            setInnerValue(newline ? value : value.replace(/[\n\r]+/g, ' '));
            setIsActive(false);
        }
    };

    // Обработчик установки фокуса
    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setInnerValue(value);
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }

    if (!isActive) return (
        <div
            className={value ? 'Editable' : (placeholder ? 'Editable Placeholder' : 'Editable')}
            onClick={() => setIsActive(true)}
        >
            {value ? value : (placeholder ?? '')}
        </div>
    );

    return (
        <textarea
            ref={ref}
            className='Editable'
            value={innerValue}
            onKeyDown={onKeyDown}
            onChange={onInnerChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            autoFocus
        />
    );
};

export default Editable;
