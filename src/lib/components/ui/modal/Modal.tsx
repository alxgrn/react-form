import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal/Portal';
import './Modal.css';

const TIMEOUT = 100; // Должен согласовываться с длительностью анимации появления в .css

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    close?: boolean; // рисовать или нет кнопку закрытия
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isOpen, onClose, close = true }) => {
    const nodeRef = useRef(null);

    // Отслеживаем нажатие ESC для закрытия окна
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };

        if (isOpen) document.body.addEventListener("keydown", closeOnEscapeKey);
        
        return () => {
            if (isOpen) document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [ isOpen, onClose ]);

    // Обработчик клика на кнопку закрытия окна или на область вокруг окна
    const onClick = (e: React.MouseEvent) => {
        // Без этого возможно двойное срабатывание при одном клике
        e.stopPropagation();
        onClose();
    };

    // не нужно при использовании CSSTransition
    // if (!isOpen) return null;

	return (
        <Portal id='alxgrn-modal' fixBody>
            <CSSTransition
                in={isOpen}
                timeout={TIMEOUT}
                unmountOnExit
                classNames='Modal'
                nodeRef={nodeRef}
            >
                <div className='Modal' ref={nodeRef} onClick={onClick}>
                    <div className='ModalInner' onClick={e => e.stopPropagation()}>
                        {close &&
                        <div className='ModalClose' onClick={onClick}>
                            <span/>
                            <span/>
                        </div>}
                        <div className='ModalContent'>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
	);
};

export default Modal;
