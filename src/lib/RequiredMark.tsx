import { Fragment, FC } from 'react';

export interface RequiredMarkProps {
    required?: boolean;
}

const RequiredMark: FC<RequiredMarkProps> = ({ required = false }) => {
    return (
        <Fragment>
            {required && <span className='Form-required-mark'>✱</span>}
        </Fragment>
    );
}

export default RequiredMark;
