import React, { FC, PropsWithChildren } from 'react';
import './FormCol.css';

const FormCol: FC<PropsWithChildren> = ({ children }) => (
    <div className='FormCol'>
        {children}
    </div>
);

export default FormCol;
