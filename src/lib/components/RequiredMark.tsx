import React, { Fragment, FC } from 'react';
import './RequiredMark.css';

export interface RequiredMarkProps {
    required?: boolean;
}

const RequiredMark: FC<RequiredMarkProps> = ({ required = false }) => {
    return (
        <Fragment>
            {required && <span className='Form-required-mark'><span/><span/><span/></span>}
        </Fragment>
    );
}

export default RequiredMark;
