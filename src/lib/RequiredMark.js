import React from 'react';
import PropTypes from 'prop-types';

const RequiredMark = ({ required }) => {
    return (
        <React.Fragment>
            {required && <span className='Form-required-mark'>✱</span>}
        </React.Fragment>
    );
};

RequiredMark.propTypes = {
    required: PropTypes.bool,
};

export default RequiredMark;
