import React, { FC, Fragment } from 'react';
import RequiredMark from './RequiredMark';

export interface LegendProps {
    legend?: string;
    required?: boolean;
    disabled?: boolean;
}

const Legend: FC<LegendProps> = ({ legend, required = false, disabled = false }) => {
    return (
        <Fragment>
            {legend &&
            <legend className={disabled ? 'disabled' : undefined}>
                <div>
                    <RequiredMark required={required}/>
                    <span>{legend}</span>
                </div>
            </legend>}
        </Fragment>
    );
}

export default Legend;
