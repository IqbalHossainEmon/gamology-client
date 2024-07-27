import { useCallback, useEffect, useRef } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import ScrollBar from '../ScrollBar/ScrollBar';
import styles from './Modal.module.css';

const Modal = ({ children, setShow, fadeIn }) => {
    const elementRef = useRef(null);
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);

    const handleHide = useCallback(() => {
        setShow(false);
        stopMenu();
    }, [setShow, stopMenu]);

    useEffect(() => {
        setElement(elementRef.current);
        showMenu();
    }, [setElement, showMenu]);

    return (
        <div ref={elementRef} className={`${fadeIn ? `${styles.hide} ` : ''}${styles.modal}`}>
            <div ref={parentRef} className={styles.modalScrollContainer}>
                <div className={styles.modalContentContainer} ref={childRef}>
                    {children(handleHide)}
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
            <button onClick={handleHide} type="button" className={styles.crossBtn}>
                <span className={styles.cross} />
            </button>
        </div>
    );
};
export default Modal;
