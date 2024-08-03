import React, { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
    id: string;
    fixBody?: boolean; // Флаг того, что надо запрещать скроллить основное окно когда портал непустой. Нужно для Modal
};

const Portal: FC<PropsWithChildren<PortalProps>> = ({ id, fixBody, children }) => {
    let portalElement = document.getElementById(id);
    if(!portalElement) {
        portalElement = document.createElement('div');
        portalElement.setAttribute('id', id);
        document.body.append(portalElement);
        // Заведем наблюдателя за содержимым если нужно фиксировать прокрутку страницы
        if (fixBody) {
            let observer = new MutationObserver(() => {
                var isEmpty = portalElement?.innerHTML === '';
                // console.log(isEmpty ? 'Нет модалки' : 'Есть модалка');
                if (isEmpty) releaseBody(); else freezeBody();
            });
            observer.observe(portalElement, {
                childList: true, // наблюдать за непосредственными детьми
            });
        }
    }
    return createPortal(children, portalElement);
};

// При открытии модального окна будем запрещать прокрутку страницы
// https://habr.com/ru/articles/459876/
// https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

const freezeBody = () => {
    // console.log(`Portal -> freezeBody`);
    const scrollY = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.top = scrollY;
    document.body.style.left = '0px';
    document.body.style.right = '0px';
    // document.body.classList.add(MODAL_CLASS_NAME);
};

// TODO: При возврате прокрутки происходит скролл вниз на несколько пикселов.
//       Пока не понятно почему и что с этим делать.
const releaseBody = () => {
    // console.log(`Portal -> releaseBody`);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // document.body.classList.remove(MODAL_CLASS_NAME);
};

export default Portal;
