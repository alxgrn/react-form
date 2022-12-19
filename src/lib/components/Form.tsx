import React, { useEffect, useState, ReactNode, ReactElement, FC, PropsWithChildren } from 'react';
import { deepForEach } from 'react-children-utilities';
import { RadioOption } from './Radio';
import { SelectOption } from './Select';
import './Form.css';

export interface FormProps {
    info?: string | null;
    error?: string | null;
    success?: string | null;
    submit?: string | null;
    wide?: boolean | null;
    onSubmit?: (d: FormData) => void;
}

export interface FormData {
    [i: string]: string | boolean | File[];
};

export const Form: FC<PropsWithChildren<FormProps>> = ({ info, error, success, submit,
                                                         wide, onSubmit, children }) => {
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
                    default:
                        break;
                }
            }
        });
    }, [ children, submit ]);

    const onClick = () => {
        if(!onSubmit) return;
        const data: FormData = {};
        deepForEach(children, (child: ReactNode) => {
            if(child && (child as ReactElement).props?.__TYPE) {
                const props = (child as ReactElement).props;
                switch(props.__TYPE) {
                    case 'Input':
                        data[props.id] = (props.value as string).trim();
                        break;
                    case 'Checkbox':
                        data[props.id] = props.checked as boolean ? true : false;
                        break;
                    case 'Select': 
                    case 'Radio':
                        data[props.id] = props.value as string;
                        break;
                    case 'Files':
                        data[props.id] = props.files as File[];
                        break;
                    default:
                        break;
                }
            }
        });
        onSubmit(data);
    };

    return(
        <div className={wide ? 'Form Form-wide' : 'Form'}>
            {info && <div className='Form-info'>{info}</div>}
            {success && <div className='Form-success'>{success}</div>}
            {error && <div className='Form-error'>{error}</div>}
            {children}
            {submit &&
            <input
                type='submit'
                value={submit}
                disabled={disabled}
                onClick={() => onClick()}
            />}
        </div>
    );
}

export default Form;
