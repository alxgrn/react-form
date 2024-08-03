import React, { FC, useEffect, useRef, useState } from 'react';
import Label from '../label/Label';
import Menu, { MenuItem } from '../ui/menu/Menu';
import './Time.css';
/**
 * TODO: Добавить выбор секунд
 */
export interface TimeProps {
    id: string;
    value: string; // в формате HH:MM
    step?: number;
    onChange?: (s: string) => void;
    label?: string | null;
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    required?: boolean | null;
    disabled?: boolean | null;
    //__TYPE?: 'Time';
};

const Time: FC<TimeProps> = ({ id, value, step = 1, onChange,
                               label, top, bottom,
                               required = false, disabled = false }) => {

    const refHor = useRef<HTMLInputElement>(null);
    const refMin = useRef<HTMLInputElement>(null);
    const [ hor, setHor ] = useState<string>('');
    const [ min, setMin ] = useState<string>('');
    const [ hors, setHors ] = useState<string[]>([]);
    const [ mins, setMins ] = useState<string[]>([]);
    const [ isHorsOpen, setIsHorsOpen ] = useState(false);
    const [ isMinsOpen, setIsMinsOpen ] = useState(false);

    // Начальное значение
    useEffect(() => {
        let [ hor, min ]: number[]|string[] = value.split(':');
        hor = parseInt(hor);
        min = parseInt(min);
        if(isNaN(hor) || hor < 0 || hor > 23) hor = 0;
        if(isNaN(min) || min < 0 || min > 59) min = 0;
        hor = `0${hor}`.slice(-2);
        min = `0${min}`.slice(-2);
        setHor(hor);
        setMin(min);
        // Вызовем установку разобранного времени в колбеке чтобы не было
        // несостыковки при передаче некорректного начального значения.
        if(onChange) onChange(`${hor}:${min}`);
    }, [ value, onChange ]);

    // Подготавливаем массивы со списками альтернатив выбора часов и минут
    useEffect(() => {
        const hors: string[] = [];
        const mins: string[] = [];

        for(let i = 0; i < 24; i ++) {
            hors.push(`0${i}`.slice(-2));
        }

        for(let i = 0; i < 60; i += step) {
            mins.push(`0${i}`.slice(-2));
        }

        setHors(hors);
        setMins(mins);
    }, [ step ]);

    const isError = () => {
        if(required && (!hor || !min)) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            caretColor:'var(--alxgrn-input-border-error)',
            borderColor:'var(--alxgrn-input-border-error)',
            backgroundColor:'var(--alxgrn-input-bg-error)',
        };
    };

    const onHorsClick = (item: MenuItem) => {
        //setHor(item.text ?? '');
        setIsHorsOpen(false);
        if(onChange) onChange(`${item.text ?? ''}:${min}`);
    };

    const onMinsClick = (item: MenuItem) => {
        //setMin(item.text ?? '');
        setIsMinsOpen(false);
        if(onChange) onChange(`${hor}:${item.text ?? ''}`);
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
                <div className='Time'>
                    <input
                        id={`${id}-hor`}
                        ref={refHor}
                        type='text'
                        value={hor}
                        style={getStyle()}
                        disabled={disabled ? true : false}
                        onClick={() => setIsHorsOpen(true)}
                        readOnly
                    />
                    <div>:</div>
                    <input
                        id={`${id}-min`}
                        ref={refMin}
                        type='text'
                        value={min}
                        style={getStyle()}
                        disabled={disabled ? true : false}
                        onClick={() => setIsMinsOpen(true)}
                        readOnly
                    />
                </div>
            </Label>
            <Menu
                parent={refHor}
                isOpen={isHorsOpen}
                onClose={() => setIsHorsOpen(false)}
                horizontal='inner-left'
                margin='var(--alxgrn-unit-small)'
                items={hors.map(h => ({ id: h, text: h }))}
                onClick={onHorsClick}
                maxHeight='auto'
                width='parent'
            />
            <Menu
                parent={refMin}
                isOpen={isMinsOpen}
                onClose={() => setIsMinsOpen(false)}
                horizontal='inner-left'
                margin='var(--alxgrn-unit-small)'
                items={mins.map(h => ({ id: h, text: h }))}
                onClick={onMinsClick}
                maxHeight='auto'
                width='parent'
            />
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Time.defaultProps = {
//     __TYPE: 'Time',
// }

export default Time;
