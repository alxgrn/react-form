import { FC, PropsWithChildren } from 'react';

export type InfoProps = {
    type?: 'error'|'success'|'accent';
    header?: string;
};

const Info: FC<PropsWithChildren<InfoProps>> = ({ type, header, children }) => (
    <div className={type ? `alxgrn-info alxgrn-info-${type}` : 'alxgrn-info'}>
        {header && <div className='alxgrn-info-header'>{header}</div>}
        {children}
    </div>
);

export default Info;
