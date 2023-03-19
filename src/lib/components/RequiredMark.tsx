import React, { Fragment, FC } from 'react';
import './RequiredMark.css';

export interface RequiredMarkProps {
    required?: boolean | null;
}

const RequiredMark: FC<RequiredMarkProps> = ({ required = false }) => {
    return (
        <Fragment>
            {required && <span className='FormRequiredMark'><span/><span/><span/></span>}
        </Fragment>
    );
}

export default RequiredMark;
