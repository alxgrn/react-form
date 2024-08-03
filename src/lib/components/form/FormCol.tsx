import React, { PropsWithChildren } from 'react';
import './FormCol.css';

const FormCol: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='FormCol'>
        {children}
    </div>
);

export default FormCol;
