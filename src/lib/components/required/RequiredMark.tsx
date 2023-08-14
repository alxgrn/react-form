import React from 'react';
//import './RequiredMark.css';

export interface RequiredMarkProps {
    required?: boolean | null;
}

const RequiredMark: React.FC<RequiredMarkProps> = ({ required = false }) => {
    if(!required) return null;
    return <span className='RequiredMark' style={{ color: 'var(--alxgrn-color-error)'}}>✱&nbsp;</span>;
    //return <span className='RequiredMark'><span/><span/><span/></span>;
};

export default RequiredMark;
