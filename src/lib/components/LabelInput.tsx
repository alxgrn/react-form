import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from './RequiredMark';
import './LabelInput.css';

export interface LabelInputProps {
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    label?: string | null;
    failed?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
}

const LabelInput: FC<PropsWithChildren<LabelInputProps>> = ({ label, top, bottom,
                    required = false, failed = false, disabled = false, children }) => {

    const className = () => {
        let c = 'Input';
        if(failed) c += ' Failed';
        if(disabled) c += ' Disabled';
        return c;
    };

    return (
        <label className={className()}>
            {label &&
            <div className='Label'>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </div>}
            {top && <div className='Top'>{top}</div>}
            {children}
            {bottom && <div className='Bottom'>{bottom}</div>}
        </label>
    );
}

export default LabelInput;
