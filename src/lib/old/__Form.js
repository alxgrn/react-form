import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deepForEach } from 'react-children-utilities';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import './__Form.css';
//
// Общий элемент формы
//
export const Form = ({ info, error, success, children, wide, submit, onSubmit }) => {
    const { t } = useTranslation();
    const [ disabled, setDisabled ] = useState(true);
    // Если выводим кнопку сабмита, то проверяем все ли данные введены для required полей.
    // Подробности про props.__TYPE описаны тут:
    // https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
    useEffect(() => {
        if(!submit) return;
        setDisabled(false);
        //console.log('--- FORM CHANGED ---');
        deepForEach(children, child => {
            if (child && child.props.__TYPE === 'FormInput' && child.props.required) {
                const value = child.props.value.trim();
                if(!value) setDisabled(true);
            }
        });
    }, [ children, submit ]);

    return(
        <div className={wide ? 'Form Form-wide' : 'Form'}>
            {success && <div className='Form-success'>{t(success)}</div>}
            {error && <div className='Form-error'>{t(error)}</div>}
            {info && <div className='Form-info'>{t(info)}</div>}
            {children}
            {submit &&
            <input
                type='submit'
                value={t(submit)}
                disabled={disabled}
                onClick={onSubmit}
            />}
        </div>
    );
};

Form.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    info: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    wide: PropTypes.bool.isRequired,
    submit: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    info: '',
    error: '',
    success: '',
    wide: false,
    submit: '',
    onSubmit: null,
};
//
// Для широких форм элемент определяющий строку из элементов ввода
//
export const FormLine = ({ children }) => {
    return(
        <div className='FormLine'>
            {children}
        </div>
    );
};

FormLine.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};
//
// Для широких форм элемент определяющий один элемент ввода в строке
//
export const FormItem = ({ children }) => {
    return(
        <div className='FormItem'>
            {children}
        </div>
    );
};

FormItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};
//
// Общий элемент ввода
//
export const FormInput = ({ id, type, value, onChange, label, placeholder,
                            hint, className, required, disabled, list, limit, accept }) => {

    const [isFileSelected, setIsFileSelected ] = useState(false);

    const style = () => {
        // Выбор файла - неуправляемый элемент, его надо отдельно обрабатывать
        if(type === 'file') {
            if(required && !isFileSelected) {
                return { borderColor:'var(--error-color)' };
            } else {
                return null;
            }
        }
        // Остальные элементы обрабатываются одинаково
        if(required && !value.trim().length) {
            return { borderColor:'var(--error-color)' };
        } else {
            return null;
        }
    };

    const doChange = (value) => {
        if(limit) value = value.substring(0, limit);
        onChange(value);
    };

    const doFileChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setIsFileSelected(true);
            onChange(file);
        } else {
            setIsFileSelected(false);
            onChange(null);
        }
    };

    return (
        <React.Fragment>
            {(label && type !== 'radio' && type !== 'checkbox') &&
            <label htmlFor={id}>
                {required && <Icon icon={faAsterisk} className='required-star'/>}
                {label}
            </label>}

            {/* TEXTAREA */}
            {type === 'textarea' &&
            <textarea
                id={id}
                rows='5'
                value={value}
                onChange={e => doChange(e.target.value)}
                placeholder={placeholder ? placeholder : null}
                className={className ? className : null}
                style={style()}
                disabled={disabled}
            />}

            {/* TEXT and PASSWORD */}
            {(type === 'text' || type === 'password') &&
            <input
                id={id}
                type={type}
                value={value}
                onChange={e => doChange(e.target.value)}
                placeholder={placeholder ? placeholder : null}
                className={className ? className : null}
                style={style()}
                disabled={disabled}
            />}

            {/* SELECT */}
            {type === 'select' &&
            <select
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                style={style()}
                disabled={disabled}
            >
                <option key='---' value=''>{hint ? hint : '---'}</option>
                {list && list.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                ))}
            </select>}

            {/* RADIO */}
            {type === 'radio' &&
            <fieldset>
                <legend htmlFor={id}>
                    {required && <Icon icon={faAsterisk} className='required-star'/>}
                    {label}
                </legend>
                {list && list.map((item, index) => (
                <div className='Form-row' key={index}>
                    <input
                        id={id + '-' + index}
                        name={id}
                        type='radio'
                        value={item.value}
                        checked={item.value === value}
                        onChange={e => onChange(e.target.value)}
                    />
                    <label htmlFor={id + '-' + index}>
                        {item.text}
                    </label>
                </div>))}
            </fieldset>}
            {/* 
                CHECKBOX
                Обратите внимание на то, что чекбокс обрабатывается иначе, чем остальные поля!
                Чекбокс устанавливается в отмеченное положение если value содержит какое-то значение,
                т.е. является непустой строкой. Это важно что value всегда строка т.к. при проверке
                того что все необходимые поля заполнены мы проверяем value как строку.
            */}
            {type === 'checkbox' &&
            <div className='Form-row'>
                <input
                    id={id}
                    type='checkbox'
                    value={value}
                    checked={value.trim() ? true : false}
                    onChange={e => doChange(e.target.value)}
                    className={className ? className : null}
                    style={style()}
                    disabled={disabled}
                />
                <label htmlFor={id}>{label}</label>
            </div>}

            {/* FILE */}
            {type === 'file' &&
            <input
                id={id}
                type='file'
                accept={accept ? accept : null}
                onChange={e => doFileChange(e)}
                placeholder={placeholder ? placeholder : null}
                className={className ? className : null}
                style={style()}
                disabled={disabled}
            />}

            {(hint && type !== 'select') && <strong>{hint}</strong>}
        </React.Fragment>
    );
};

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text','pasword','textarea','select','radio','checkbox','file']).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    list: PropTypes.array,
    limit: PropTypes.number,
    accept: PropTypes.string,
    __TYPE: PropTypes.string,
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
FormInput.defaultProps = {
    __TYPE: 'FormInput',
};
//
// Дефолтовый экспорт
//
export default Form;
