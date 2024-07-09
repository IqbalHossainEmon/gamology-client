import { useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../Hooks/useDropDownHide';
import styles from './CardDot.module.css';

const CardDot = ({ item, lists, parentRef }) => {
    const [btnShow, setBtnShow] = useState(false);
    const [btnFadeIn, setBtnFadeIn] = useState(false);
    const [listShow, setListShow] = useState(false);
    const [listFadeIn, setListFadeIn] = useState(false);

    const elementRef = useRef(null);

    const btnShowRef = useRef(btnShow);
    btnShowRef.current = btnShow;

    const { showMenu, setElement } = useDropDownHide(setListShow);

    const firstTimerRef = useRef(null);
    const secondTimerRef = useRef(null);

    const handleShow = useCallback(e => {
        e.stopPropagation();
        if (secondTimerRef.current) {
            clearTimeout(secondTimerRef.current);
            secondTimerRef.current = null;
            setBtnFadeIn(true);
            return;
        }
        if (firstTimerRef.current) {
            clearTimeout(firstTimerRef.current);
            firstTimerRef.current = null;
        }
        setBtnShow(true);
        firstTimerRef.current = setTimeout(() => {
            setBtnFadeIn(true);
            firstTimerRef.current = null;
        }, 100);
    }, []);

    const handleHide = useCallback(e => {
        e.stopPropagation();

        if (firstTimerRef.current) {
            clearTimeout(firstTimerRef.current);
            firstTimerRef.current = null;
            setBtnShow(false);
            return;
        }
        if (secondTimerRef.current) {
            clearTimeout(secondTimerRef.current);
            secondTimerRef.current = null;
        }
        setBtnFadeIn(false);
        secondTimerRef.current = setTimeout(() => {
            setBtnShow(false);
            secondTimerRef.current = null;
        }, 200);
    }, []);

    useEffect(() => {
        const parent = parentRef.current;
        if (parent) {
            parent.addEventListener('mouseenter', handleShow);
            parent.addEventListener('mouseleave', handleHide);
        }
        return () => {
            if (parent) {
                parent.removeEventListener('mouseenter', handleShow);
                parent.removeEventListener('mouseleave', handleHide);
            }
        };
    }, [handleHide, handleShow, parentRef]);

    useEffect(() => {
        setElement(elementRef.current);
    }, [setElement]);

    return (
        <div ref={elementRef} className={styles.cardDots}>
            {(btnShow || listShow) && (
                <button
                    onClick={() => {
                        setListShow(prev => !prev);
                        showMenu(true);
                    }}
                    className={`${styles.btnDot}${btnFadeIn || listShow ? ` ${styles.zoomIn}` : ''}`}
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
            {listShow && (
                <ul className={styles.listContainer}>
                    {lists.map(list => (
                        <li key={list.id}>
                            <button
                                onClick={() => {
                                    list.event(item);
                                    setListShow(false);
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
