import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from './RequiredMark';
import './LabelRadio.css';

export interface LabelRadioProps {
    hint?: string;
    label?: string;
    error?: string;
    failed?: boolean;
    disabled?: boolean;
    required?: boolean;
    checked?: boolean;
}

const LabelRadio: FC<PropsWithChildren<LabelRadioProps>> = ({ label, hint, error,
                    required = false, failed = false, disabled = false, checked = false, children }) => {

    const className = () => {
        let c = 'radio';
        if(failed) c += ' failed';
        if(disabled) c += ' disabled';
        if(checked) c += ' checked';
        return c;
    };
                    
    return (
        <label className={className()}>
            {children}
            <s/>
            <div>
                {label &&
                <div>
                    <RequiredMark required={required}/>
                    <span style={failed ? {color:'var(--color-error)'} : undefined}>
                        {label}
                    </span>
                </div>}
                {error && <div className='error'>{error}</div>}
                {hint && <div className='hint'>{hint}</div>}
            </div>
        </label>
    );
}

export default LabelRadio;
