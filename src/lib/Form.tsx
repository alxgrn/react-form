import { useEffect, useState, ReactNode, ReactElement } from 'react';
import { deepForEach } from 'react-children-utilities';

export interface FormProps {
    info?: string;
    error?: string;
    success?: string;
    submit?: string;
    wide?: boolean;
    onSubmit?: () => void;
    children?: ReactNode;
}

export const Form = ({ info, error, success, submit, wide, onSubmit, children }: FormProps) => {
    const [ disabled, setDisabled ] = useState(false);
    // Если выводим кнопку сабмита, то проверяем все ли данные введены для required полей.
    // Подробности про props.__TYPE описаны тут:
    // https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
    useEffect(() => {
        if(!submit) return;
        setDisabled(false);
        deepForEach(children, (child: ReactNode) => {
            if ( child &&
                (child as ReactElement).props.__TYPE === 'FormItem' && 
                (child as ReactElement).props.required) {
                const value = (child as ReactElement).props.value.trim();
                if(!value) setDisabled(true);
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
