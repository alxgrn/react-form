import React, { useEffect, useState, ReactNode, ReactElement, FC, PropsWithChildren } from 'react';
import { deepForEach } from 'react-children-utilities';
import { isValidDate } from './Date';
import { RadioOption } from './Radio';
import { SelectOption } from './Select';
import { CheckboxListOption, CheckboxListValue } from './CheckboxList';
import './Form.css';
import Button from './Button';

export type FormProps = {
    info?: string | null;
    error?: string | null;
    success?: string | null;
    submit?: string | null;
    cancel?: string | null;
    wide?: boolean | null;
    onSubmit?: (d: FormData) => void;
    onCancel?: () => void;
}

export type FormData = {
    [i: string]: string | number | boolean | File[] | any[];
};

export const Form: FC<PropsWithChildren<FormProps>> = ({ info, error, success, submit, cancel,
                                                         wide, onSubmit, onCancel, children }) => {
    const [ disabled, setDisabled ] = useState(false);
    // Если выводим кнопку сабмита, то проверяем все ли данные введены для required полей.
    // Подробности про props.__TYPE описаны тут:
    // https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
    useEffect(() => {
        if(!submit) return;
        setDisabled(false);
        deepForEach(children, (child: ReactNode) => {
            if(child && (child as ReactElement).props?.required && (child as ReactElement).props?.__TYPE) {
                const props = (child as ReactElement).props;
                switch(props.__TYPE) {
                    case 'Input':
                        // Значение должно быть непустой строкой
                        if(!(props.value as string).trim()) setDisabled(true);
                        break;
                    case 'Checkbox':
                        // Чекбокс должен быть отмечен
                        if(!(props.checked as boolean)) setDisabled(true);
                        break;
                    case 'Select': {
                        // Среди списка опций должна быть опция с указанным значением
                        const value = props.value as string;
                        const options = props.options as SelectOption[];
                        if(options.findIndex(a => a.value === value) < 0) setDisabled(true); }
                        break;
                    case 'Radio': {
                        // Среди списка опций должна быть опция с указанным значением
                        const value = props.value as string;
                        const options = props.options as RadioOption[];
                        if(options.findIndex(a => a.value === value) < 0) setDisabled(true); }
                        break;
                    case 'Files':
                        // Должен быть выбран хотя бы один файл
                        const files = props.files as File[];
                        if(files.length < 1) setDisabled(true);
                        break;
                    case 'Date':
                        // Дата должна быть валидна
                        if(!isValidDate((props.value as string).trim())) setDisabled(true);
                        break;
                    case 'CheckboxList': {
                        // Должен быть выбран хотя бы один чекбокс
                        const options = props.options as CheckboxListOption[];
                        if(options.findIndex(a => a.checked === true) < 0) setDisabled(true); }
                        break;
                    default:
                        break;
                }
            }
        });
    }, [ children, submit ]);

    const onClick = () => {
        if(!onSubmit) return;
        const data: FormData = {};

        // Мы добавляем даные по идентификатору.
        // Если идентификатор повторяется, то мы создаем массив значений.
        const addData = (id: string, value: string|number|boolean|File[]|CheckboxListValue[]) => {
            if(!data[id]) {
                data[id] = value;
                return;
            }
            if(data[id] instanceof Array) {
                (data[id] as any[]).push(value);
            } else {
                data[id] = [ data[id], value ];
            }
        };

        deepForEach(children, (child: ReactNode) => {
            if(child && (child as ReactElement).props?.__TYPE) {
                const props = (child as ReactElement).props;
                switch(props.__TYPE) {
                    case 'Date':
                    case 'Input':
                        addData(props.id, (props.value as string).trim());
                        break;
                    case 'Checkbox':
                        addData(props.id, props.checked as boolean ? true : false);
                        break;
                    case 'Select': 
                    case 'Radio':
                        addData(props.id, props.value as string);
                        break;
                    case 'Files':
                        addData(props.id, props.files as File[]);
                        break;
                    case 'Hidden':
                        addData(props.id, props.value as string | number);
                        break;
                    case 'CheckboxList': {
                        const value: CheckboxListValue[] = [];
                        const options = props.options as CheckboxListOption[];
                        options.forEach(o => { if(o.checked) value.push(o.value); });
                        addData(props.id, value); }
                        break;
                    default:
                        break;
                }
            }
        });
        onSubmit(data);
    };

    return(
        <div className={wide ? 'Form FormWide' : 'Form'}>
            {success && <div className='FormSuccess'>{success}</div>}
            {error && <div className='FormError'>{error}</div>}
            {info && <div className='FormInfo'>{info}</div>}
            {children}
            {(submit || cancel) &&
            <div className='SubmitButtons'>
                {submit &&
                <input
                    type='submit'
                    value={submit}
                    disabled={disabled}
                    onClick={() => onClick()}
                />}
                {cancel &&
                <Button
                    type='Cancel'
                    label={cancel}
                    onClick={onCancel}
                />}
            </div>}
        </div>
    );
}

export default Form;
