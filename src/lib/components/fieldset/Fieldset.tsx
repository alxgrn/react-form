import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from '../required/RequiredMark';
import './Fieldset.css';

export type FieldsetProps = {
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    label?: string | null;
    error?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
};

const Fieldset: FC<PropsWithChildren<FieldsetProps>> = ({ label, top, bottom,
                    required = false, error = false, disabled = false, children }) => {

    const className = () => {
        let c = 'Fieldset';
        if(error) c += ' Error';
        if(disabled) c += ' Disabled';
        return c;
    };

    return (
        <div className={className()}>
            {label &&
            <div className='Label'>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </div>}
            {top && <div className='Top'>{top}</div>}
            <div className='Inner'>{children}</div>
            {bottom && <div className='Bottom'>{bottom}</div>}
        </div>
    );
};

export default Fieldset;
