import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal/Portal';
import './Popup.css';
/**
 * Компонент всплывающего блока.
 * Используется для отображения меню, блока выбора даты и т.п.
 * Предполагается что его надо располагать относительно родительского компонента.
 */
const TIMEOUT = 100; // Должен согласовываться с длительностью анимации появления в .css

type PopupProps = {
    parent: React.RefObject<HTMLElement>;
    isOpen: boolean;
    onClose: () => void;
    margin?: string; // отступ от родителя в css-юнитах
    vertical?: 'top'|'bottom'|'inner-top'|'inner-bottom';
    horizontal?: 'left'|'right'|'inner-left'|'inner-right'; 
};

const Popup:FC<PropsWithChildren<PopupProps>> = ({ parent, isOpen, onClose, vertical, horizontal, margin = '0', children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ innerStyle, setInnerStyle ] = useState({});
    const [ popupStyle, setPopupStyle ] = useState({});

    // Если расположение меню относительно родителя не указано явно через
    // vertical/horizontal, располагаем его в зависимости от того, в каком
    // квадранте экрана находится родитель.
    useEffect(() => {
        if(!parent.current) {
            setInnerStyle({});
            setPopupStyle({});
            return;
        }
        // Размеры окна
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        // Координаты родителя
        const prnt = parent.current.getBoundingClientRect();
        // Скопируем координаты и размеры родителя в стили контейнера
        setPopupStyle({
            top: prnt.top + window.scrollY,
            left: prnt.left + window.scrollX,
            width: prnt.width,
            height: prnt.height,
        });
        // Позиционирование содержимого относительно контейнера
        const style: any = {};
        // Позиционирование по вертикали
        switch(vertical) {
            case 'top':
                // над родительским компонентом
                style.bottom = '100%';
                style.marginBottom = margin;
                break;
            case 'bottom':
                // под родительским компонентом
                style.top = '100%';
                style.marginTop = margin;
                break;
            case 'inner-top':
                // верхняя граница совпадает с верхней границей родителя
                style.top = 0;
                break;
            case 'inner-bottom':
                // нижняя граница совпадает с нижней границей родителя
                style.bottom = 0;
                break;
            default:
                // если сверху места больше, чем снизу, то покажем сверху, иначе - снизу
                if(prnt.top < height - prnt.bottom) {
                    style.top = '100%';
                    style.marginTop = margin;
                } else {
                    style.bottom = '100%';
                    style.marginBottom = margin;
                }
                break;
        }
        // Позиционирование по горизонтали
        switch(horizontal) {
            case 'left':
                // слева от родительского компонента
                style.right = '100%';
                style.marginRight = margin;
                break;
            case 'right':
                // справа от родительского компонента
                style.left = '100%';
                style.marginLeft = margin;
                break;
            case 'inner-left':
                // левая граница совпадает с левой границей родителя
                style.left = 0;
                break;
            case 'inner-right':
                // правая граница совпадает с правой границей родителя
                style.right = 0;
                break;
            default:
                // если слева места больше, чем справа, то покажем слева, иначе - справа
                if(prnt.left < width - prnt.right) {
                    style.left = '100%';
                    style.marginLeft = margin;
                } else {
                    style.right = '100%';
                    style.marginRight = margin;
                }
                break;
        }
        // Устанавливаем
        setInnerStyle(style);
    }, [ parent, isOpen, margin, vertical, horizontal ]);

    // Скрываем при клике вне компонента
    // Используем нисходящее событие, а не восходящее!
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !(ref.current as any).contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClose ]);

    // Скрываем по Esc и Enter
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };
        document.body.addEventListener("keydown", handleEscape);
        return () => {
            document.body.removeEventListener("keydown", handleEscape);
        };
    }, [ onClose ]);

    // Не нужно при использовании CSSTransition с unmountOnExit
    // if (!isOpen) return null;

    return (
        <Portal id='alxgrn-popup'>
            <CSSTransition
                in={isOpen}
                timeout={TIMEOUT}
                unmountOnExit
                classNames='Popup'
                nodeRef={ref}
            >
                <div className='Popup' style={popupStyle}>
                    <div className='PopupInner' ref={ref} style={innerStyle}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
};

export default Popup;
