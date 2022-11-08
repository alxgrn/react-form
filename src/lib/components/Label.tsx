import React, { FC, Fragment } from 'react';
import RequiredMark from './RequiredMark';

export interface LabelProps {
    id: string;
    label?: string;
    required?: boolean;
    style?: object;
    error?: string;
    hint?: string;
    disabled?: boolean;
}

const Label: FC<LabelProps> = ({ id, label, required = false, style,
                                 error, hint, disabled = false }) => {
    return (
        <Fragment>
            {label &&
            <label
                htmlFor={id}
                style={disabled ? { color: 'var(--color-disabled)'} : undefined}
            >
                <div>
                    <RequiredMark required={required}/>
                    <span style={style}>{label}</span>
                </div>
                {error &&
                <div className='Form-item-error'>
                    {error}
                </div>}

                {hint &&
                <div className='Form-item-hint'>
                    {hint}
                </div>}
            </label>}
        </Fragment>
    );
}

export default Label;
