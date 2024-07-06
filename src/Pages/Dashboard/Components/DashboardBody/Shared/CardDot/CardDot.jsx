import { useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../Hooks/useDropDownHide';
import styles from './CardDot.module.css';

const CardDot = ({ item, lists, parentRef }) => {
    const [btnShow, setBtnShow] = useState({ fadeIn: false, show: false });
    const [show, setShow] = useState(false);

    const elementRef = useRef(null);

    const btnShowRef = useRef(btnShow);
    btnShowRef.current = btnShow;

    const { showMenu, setElement } = useDropDownHide(setShow);

    const firstTimerRef = useRef(null);

    const handleShow = useCallback(e => {
        e.stopPropagation();
        setBtnShow({ fadeIn: false, show: true });

        if (firstTimerRef.current) {
            clearTimeout(firstTimerRef.current);
            firstTimerRef.current = null;
        }

        firstTimerRef.current = setTimeout(() => {
            setBtnShow(prev => ({ ...prev, fadeIn: true }));
            firstTimerRef.current = null;
        }, 1);
    }, []);

    const secondTimerRef = useRef(null);

    const handleHide = useCallback(e => {
        e.stopPropagation();
        if (secondTimerRef.current) {
            clearTimeout(secondTimerRef.current);
            secondTimerRef.current = null;
        }
        setBtnShow({ fadeIn: false, show: true });
        secondTimerRef.current = setTimeout(() => {
            setBtnShow({ fadeIn: false, show: false });
            secondTimerRef.current = null;
        }, 2000);
    }, []);

    useEffect(() => {
        const parent = parentRef.current;
        if (parent) {
            parent.addEventListener('mousemove', handleShow);
            parent.addEventListener('mouseleave', handleHide);
        }
        return () => {
            if (parent) {
                parent.removeEventListener('mousemove', handleShow);
                parent.removeEventListener('mouseleave', handleHide);
            }
        };
    }, [handleHide, handleShow, parentRef]);

    useEffect(() => {
        setElement(elementRef.current);
    }, [setElement]);

    return (
        <div ref={elementRef} className={styles.cardDots}>
            {(btnShow.show || show) && (
                <button
                    onClick={() => {
                        setShow(prev => !prev);
                        showMenu(true);
                    }}
                    className={`${styles.btnDot}${btnShow.fadeIn ? ` ${styles.zoomIn}` : ''}`}
                    type="button"
                >
                    <svg
                        viewBox="0 0 32 32"
                        enableBackground="new 0 0 32 32"
                        version="1.1"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                    >
                        <g strokeWidth="0" />
                        <g strokeLinecap="round" strokeLinejoin="round" />
                        <g>
                            <circle cx="16" cy="16" fill="#F08A5D" r="2" />
                            <circle cx="16" cy="26" fill="#B83B5E" r="2" />
                            <circle cx="16" cy="6" fill="#B83B5E" r="2" />
                            <circle
                                cx="16"
                                cy="16"
                                fill="none"
                                r="2"
                                stroke="#200F60"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="0.00032"
                            />
                            <circle
                                cx="16"
                                cy="26"
                                fill="#F9ED69"
                                r="2"
                                stroke="#200F60"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="0.00032"
                            />
                            <circle
                                cx="16"
                                cy="6"
                                fill="none"
                                r="2"
                                stroke="#200F60"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="0.00032"
                            />
                        </g>
                    </svg>
                </button>
            )}
            {show && (
                <ul className={styles.listContainer}>
                    {lists.map(list => (
                        <li key={list.id}>
                            <button
                                onClick={() => {
                                    list.event(item);
                                    setShow(false);
                                }}
                                type="button"
                            >
                                {list.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default CardDot;
