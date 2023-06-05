import React, { FC, PropsWithChildren } from 'react';
import Legend, { LegendProps } from './Legend';
import './Fieldset.css';

const Fieldset: FC<PropsWithChildren<LegendProps>> = (props) => {
    const { children, ...legend } = props;
    return (
        <fieldset className={legend.failed ? 'failed' : undefined}>
            <Legend {...legend}/>
            {children}
        </fieldset>
    );
}

export default Fieldset;
