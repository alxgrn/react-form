import React from 'react';

export interface RequiredMarkProps {
    required?: boolean;
}

const RequiredMark = ({ required = false }: RequiredMarkProps) => {
    return (
        <React.Fragment>
            {required && <span className='Form-required-mark'>✱</span>}
        </React.Fragment>
    );
}

export default RequiredMark;
