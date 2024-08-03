import React, { PropsWithChildren } from 'react';
import RequiredMark from '../required/RequiredMark';
import './RadioLabel.css';

export interface RadioLabelProps {
    label?: string | null;
    bottom?: string | null;
    error?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
    checked?: boolean | null;
}

const RadioLabel: React.FC<PropsWithChildren<RadioLabelProps>> = ({ label, bottom,
                    required = false, error = false, disabled = false, checked = false, children }) => {

    const className = () => {
        let c = 'Radio';
        if(error) c += ' Error';
        if(disabled) c += ' Disabled';
        if(checked) c += ' Checked';
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
                    <span style={error ? {color:'var(--alxgrn-color-error)'} : undefined}>
                        {label}
                    </span>
                </div>}
                {bottom && <div className='Bottom'>{bottom}</div>}
            </div>
        </label>
    );
}

export default RadioLabel;
