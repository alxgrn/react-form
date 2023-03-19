import React, { FC, PropsWithChildren } from 'react';
import './FormRow.css';

const FormRow: FC<PropsWithChildren> = ({ children }) => {
    return(
        <div className='FormRow'>
            {children}
        </div>
    );
};

export default FormRow;
