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

    const firstTimerBtnRef = useRef(null);
    const secondTimerBtnRef = useRef(null);

    const firstTimerListRef = useRef(null);
    const secondTimerListRef = useRef(null);

    const handleHide = useCallback(e => {
        e.stopPropagation();

        if (firstTimerBtnRef.current) {
            clearTimeout(firstTimerBtnRef.current);
            firstTimerBtnRef.current = null;
            setBtnShow(false);
            return;
        }
        if (secondTimerBtnRef.current) {
            clearTimeout(secondTimerBtnRef.current);
            secondTimerBtnRef.current = null;
        }
        setBtnFadeIn(false);
        secondTimerBtnRef.current = setTimeout(() => {
            setBtnShow(false);
            secondTimerBtnRef.current = null;
        }, 200);
    }, []);

    const handleShow = useCallback(
        e => {
            e.stopPropagation();
            if (secondTimerBtnRef.current) {
                clearTimeout(secondTimerBtnRef.current);
                secondTimerBtnRef.current = null;
                setBtnFadeIn(true);
                return;
            }
            if (firstTimerBtnRef.current) {
                clearTimeout(firstTimerBtnRef.current);
                firstTimerBtnRef.current = null;
            }
            setBtnShow(true);
            firstTimerBtnRef.current = setTimeout(() => {
                setBtnFadeIn(true);
                window.addEventListener('blur', handleHide);
                firstTimerBtnRef.current = null;
            }, 100);
        },
        [handleHide]
    );

    const { showMenu, setElement } = useDropDownHide(setListShow);

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
                        if (firstTimerListRef.current) {
                            clearTimeout(firstTimerListRef.current);
                            firstTimerListRef.current = null;
                            setListFadeIn(true);
                            return;
                        }
                        if (secondTimerListRef.current) {
                            clearTimeout(secondTimerListRef.current);
                            secondTimerListRef.current = null;
                        }

                        showMenu(true);

                        if (!listShow) {
                            setListShow(true);
                            setListFadeIn(false);
                            firstTimerListRef.current = setTimeout(() => {
                                setListFadeIn(true);
                                firstTimerListRef.current = null;
                            }, 100);
                        } else {
                            setListFadeIn(false);
                            secondTimerListRef.current = setTimeout(() => {
                                setListShow(false);
                                secondTimerListRef.current = null;
                            }, 200);
                        }
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
            <div />
            {listShow && (
                <ul className={`${styles.listContainer}${listFadeIn ? ` ${styles.zoomIn}` : ''}`}>
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
