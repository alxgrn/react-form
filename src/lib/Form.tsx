import { useEffect, useState, ReactNode, ReactElement, FC, PropsWithChildren } from 'react';
import { deepForEach } from 'react-children-utilities';
import { RadioOption } from './Radio';
import { SelectOption } from './Select';

export interface FormProps {
    info?: string;
    error?: string;
    success?: string;
    submit?: string;
    wide?: boolean;
    onSubmit?: () => void;
}

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
            if(child && (child as ReactElement).props.required) {
                const props = (child as ReactElement).props;
                switch(props.__TYPE) {
                    case 'Input':
                        // Значение должно быть непустой строкой
                        if(!props.value.trim()) setDisabled(true);
                        break;
                    case 'Checkbox':
                        // Чекбокс должен быть отмечен
                        if(!props.checked) setDisabled(true);
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
                    default:
                        break;
                }
            }
        });
    }, [ children, submit ]);

    const onClick = () => {
        if(onSubmit) onSubmit();
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
