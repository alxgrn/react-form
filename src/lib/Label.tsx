import React from 'react';
import RequiredMark from './RequiredMark';

export interface LabelProps {
    id: string;
    label?: string;
    required?: boolean;
}

const Label = ({ id, label, required = false }: LabelProps) => {
    return (
        <React.Fragment>
            {label &&
            <label htmlFor={id}>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </label>}
        </React.Fragment>
    );
}

export default Label;
