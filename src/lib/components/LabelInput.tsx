import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from './RequiredMark';
import './LabelInput.css';

export interface LabelInputProps {
    hint?: string;
    error?: string;
    label?: string;
    failed?: boolean;
    disabled?: boolean;
    required?: boolean;
}

const LabelInput: FC<PropsWithChildren<LabelInputProps>> = ({ label, hint, error,
                    required = false, failed = false, disabled = false, children }) => {

    const className = () => {
        let c = 'input';
        if(failed) c += ' failed';
        if(disabled) c += ' disabled';
        return c;
    };

    return (
        <label className={className()}>
            {label &&
            <div className='label'>
                <RequiredMark required={required}/>
                <span style={failed ? {color:'var(--color-error)'} : undefined}>
                    {label}
                </span>
            </div>}
            {children}
            {(error || hint) &&
            <div className='error-hint'>
                {error && <div className='error'>{error}</div>}
                {hint && <div className='hint'>{hint}</div>}
            </div>}
        </label>
    );
}

export default LabelInput;
