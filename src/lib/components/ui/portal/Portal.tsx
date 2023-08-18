import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
    id: string;
};

const Portal: FC<PropsWithChildren<PortalProps>> = ({ id, children }) => {
    let portalElement = document.getElementById(id);
    if(!portalElement) {
        portalElement = document.createElement('div');
        portalElement.setAttribute('id', id);
        document.body.append(portalElement);
    }
    return createPortal(children, portalElement);
};

export default Portal;
