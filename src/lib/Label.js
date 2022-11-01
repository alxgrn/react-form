import React from 'react';
import PropTypes from 'prop-types';
import RequiredMark from './RequiredMark';

const Label = ({ id, label, required }) => {
    return (
        <React.Fragment>
            {label &&
            <label htmlFor={id}>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </label>}
        </React.Fragment>
    );
};

Label.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
};

export default Label;
