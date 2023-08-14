import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from '../required/RequiredMark';
import './Label.css';

export type LabelProps = {
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    label?: string | null;
    error?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
};

const Label: FC<PropsWithChildren<LabelProps>> = ({ label, top, bottom,
                    required = false, error = false, disabled = false, children }) => {

    const className = () => {
        let c = '';
        if(error) c += ' Error';
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
};

export default Label;
