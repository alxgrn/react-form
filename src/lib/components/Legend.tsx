import React, { FC, Fragment } from 'react';
import RequiredMark from './RequiredMark';

export interface LegendProps {
    legend?: string;
    failed?: boolean;
    required?: boolean;
    disabled?: boolean;
}

const Legend: FC<LegendProps> = ({ legend, failed = false, required = false, disabled = false }) => {
    return (
        <Fragment>
            {legend &&
            <legend className={disabled ? 'disabled' : undefined}>
                <div>
                    <RequiredMark required={required}/>
                    <span style={failed ? {color:'var(--color-error)'} : undefined}>
                        {legend}
                    </span>
                </div>
            </legend>}
        </Fragment>
    );
}

export default Legend;
