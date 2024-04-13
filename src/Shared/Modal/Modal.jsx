import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import ScreenShadow from '../ScreenShadow/ScreenShadow';
import ScrollBar from '../ScrollBar/ScrollBar';
import styles from './Modal.module.css';

const Modal = ({ children, setShow }) => {
    const [hideAnimation, setHideAnimation] = useState(false);

    const elementRef = useRef(null);
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const timerId = useRef(null);

    const eventRef = useRef(null);

    eventRef.handleModalClose = useCallback(() => {
        setHideAnimation(true);
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
        }
        timerId.current = setTimeout(() => {
            timerId.current = null;
            setShow();
        }, 300);
    }, [setShow]);

    const { showMenu, setElement, stopMenu } = useDropDownHide(eventRef.handleModalClose);

    useEffect(() => {
        setElement(elementRef.current);
        showMenu();
    }, [setElement, showMenu]);

    return (
        <>
            <div ref={elementRef} className={`${hideAnimation ? `${styles.hide} ` : ''}${styles.modal}`}>
                <div ref={parentRef} className={styles.modalScrollContainer}>
                    <div className={styles.modalContentContainer} ref={childRef}>
                        {Children.map(children, child =>
                            isValidElement(child)
                                ? cloneElement(child, {
                                      handleHide: () => {
                                          eventRef.handleModalClose();
                                          stopMenu();
                                      },
                                  })
                                : child
                        )}
                    </div>
                </div>
                <button
                    onClick={() => {
                        eventRef.handleModalClose();
                        stopMenu();
                    }}
                    type="button"
                    className={styles.crossBtn}
                >
                    <span className={styles.cross} />
                </button>
                <ScrollBar parentRef={parentRef} childRef={childRef} />
            </div>
            <ScreenShadow show={!hideAnimation} />
        </>
    );
};
export default Modal;
