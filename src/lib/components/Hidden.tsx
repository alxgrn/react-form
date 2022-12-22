import React, { FC } from 'react';

export interface HiddenProps {
    id: string;
    value: string | number;
    __TYPE?: string;
}

const Hidden: FC<HiddenProps> = ({ id, value }) => {
    return (
        <input
            id={id}
            type='hidden'
            value={value}
        />
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Hidden.defaultProps = {
    __TYPE: 'Hidden',
}

export default Hidden;
