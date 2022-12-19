import React, { FC, Fragment } from 'react';
import RequiredMark from './RequiredMark';

export interface LegendProps {
    legend?: string | null;
    failed?: boolean | null;
    required?: boolean | null;
    disabled?: boolean | null;
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
