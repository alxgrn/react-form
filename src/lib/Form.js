import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deepForEach } from 'react-children-utilities';
//
// Общий элемент формы
//
export const Form = ({ info, error, success, submit, wide, onSubmit, children }) => {
    const [ disabled, setDisabled ] = useState(false);
    // Если выводим кнопку сабмита, то проверяем все ли данные введены для required полей.
    // Подробности про props.__TYPE описаны тут:
    // https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
    useEffect(() => {
        if(!submit) return;
        setDisabled(false);
        deepForEach(children, child => {
            if (child && child.props.__TYPE === 'FormItem' && child.props.required) {
                const value = child.props.value.trim();
                if(!value) setDisabled(true);
            }
        });
    }, [ children, submit ]);

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
                onClick={() => onSubmit()}
            />}
        </div>
    );
};

Form.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
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
    submit: '',
    wide: false,
    onSubmit: null,
    children: null,
};

export default Form;
