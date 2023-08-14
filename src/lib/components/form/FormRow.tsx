import React, { FC, PropsWithChildren } from 'react';
import './FormRow.css';

const FormRow: FC<PropsWithChildren> = ({ children }) => (
    <div className='FormRow'>
        {children}
    </div>
);

export default FormRow;
