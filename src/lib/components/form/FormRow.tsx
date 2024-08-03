import React, { PropsWithChildren } from 'react';
import './FormRow.css';

const FormRow: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='FormRow'>
        {children}
    </div>
);

export default FormRow;
