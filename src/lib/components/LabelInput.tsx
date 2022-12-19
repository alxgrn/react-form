import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from './RequiredMark';
import './LabelInput.css';

export interface LabelInputProps {
    top?: string | null;
    bottom?: string | null;
    label?: string | null;
    failed?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
}

const LabelInput: FC<PropsWithChildren<LabelInputProps>> = ({ label, top, bottom,
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
                <span>{label}</span>
            </div>}
            {top && <div className='top'>{top}</div>}
            {children}
            {bottom && <div className='bottom'>{bottom}</div>}
        </label>
    );
}

export default LabelInput;
