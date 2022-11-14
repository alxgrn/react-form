import React, { FC, Fragment } from 'react';
import RequiredMark from './RequiredMark';

export interface LabelProps {
    id: string;
    label?: string;
    error?: string;
    hint?: string;
    failed?: boolean;
    disabled?: boolean;
    required?: boolean;
}

const Label: FC<LabelProps> = ({ id, label, required = false, failed = false,
                                 error, hint, disabled = false }) => {

    const getClass = () => {
        let style = failed ? 'failed' : '';
        if(disabled) style += ' disabled';
        return style;
    };

    return (
        <Fragment>
            {label &&
            <label
                htmlFor={id}
                className={getClass()}
            >
                <s/>
                <div>
                    <div>
                        <RequiredMark required={required}/>
                        <span style={failed ? {color:'var(--color-error)'} : undefined}>
                            {label}
                        </span>
                    </div>
                    {error &&
                    <div className='Form-item-error'>
                        {error}
                    </div>}

                    {hint &&
                    <div className='Form-item-hint'>
                        {hint}
                    </div>}
                </div>
            </label>}
        </Fragment>
    );
}

export default Label;
