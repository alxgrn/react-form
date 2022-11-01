import PropTypes from 'prop-types';
import Label from './Label';

const Input = ({ id, type, value, onChange, label, placeholder,
                 hint, error, className, required, disabled, limit }) => {

    const getStyle = () => {
        if(required && !value.trim().length) {
            return {
                borderColor:'var(--color-error)',
                backgroundColor:'var(--background-error)',
            };
        } else {
            return null;
        }
    };

    const doChange = (value) => {
        if(limit) value = value.substring(0, limit);
        onChange(value);
    };

    return (
        <div className='Form-item'>
            <Label id={id} label={label} required={required}/>

            <input
                id={id}
                type={type}
                value={value}
                onChange={e => doChange(e.target.value)}
                placeholder={placeholder ? placeholder : null}
                className={className ? className : null}
                style={getStyle()}
                disabled={disabled}
            />

            {error &&
            <div className='Form-item-error'>
                {error}
            </div>}

            {hint &&
            <div className='Form-item-hint'>
                {hint}
            </div>}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text','password']).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    limit: PropTypes.number,
    __TYPE: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    __TYPE: 'FormItem',
};

export default Input;
