import { useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../Hooks/useDropDownHide';
import styles from './CardDot.module.css';

const CardDot = ({ item, lists, parentRef }) => {
    const [btnShow, setBtnShow] = useState(false);
    const [btnFadeIn, setBtnFadeIn] = useState(false);
    const [listShow, setListShow] = useState(false);
    const [listFadeIn, setListFadeIn] = useState(false);

    const elementRef = useRef(null);

    const listShowRef = useRef(listShow);
    listShowRef.current = listShow;

    const firstTimerBtnRef = useRef(null);
    const secondTimerBtnRef = useRef(null);

    const firstTimerListRef = useRef(null);
    const secondTimerListRef = useRef(null);

    const handleHideBtn = useCallback(shouldIgnore => {
        if ((listShowRef.current && shouldIgnore) || secondTimerBtnRef.current) {
            return;
        }
        if (firstTimerBtnRef.current) {
            clearTimeout(firstTimerBtnRef.current);
            firstTimerBtnRef.current = null;
            setBtnShow(false);
            return;
        }

        setBtnFadeIn(false);
        secondTimerBtnRef.current = setTimeout(() => {
            setBtnShow(false);
            window.removeEventListener('blur', handleHideBtn);
            secondTimerBtnRef.current = null;
        }, 200);
    }, []);

    const handleShowBtn = useCallback(() => {
        if (secondTimerBtnRef.current) {
            clearTimeout(secondTimerBtnRef.current);
            secondTimerBtnRef.current = null;
            setBtnFadeIn(true);
            return;
        }
        if (firstTimerBtnRef.current) {
            return;
        }
        setBtnShow(true);
        firstTimerBtnRef.current = setTimeout(() => {
            setBtnFadeIn(true);
            window.addEventListener('blur', handleHideBtn);
            firstTimerBtnRef.current = null;
        }, 60);
    }, [handleHideBtn]);

    const handleHideList = useCallback(() => {
        if (firstTimerListRef.current) {
            clearTimeout(firstTimerListRef.current);
            firstTimerListRef.current = null;
            setListShow(false);
            return;
        }
        if (secondTimerListRef.current) {
            clearTimeout(secondTimerListRef.current);
            secondTimerListRef.current = null;
            setListShow(false);
        }
        setListFadeIn(false);
        secondTimerListRef.current = setTimeout(() => {
            setListShow(false);
            secondTimerListRef.current = null;
        }, 200);
    }, []);

    const handleHideListBlur = useCallback(() => {
        handleHideBtn();
        handleHideList();
    }, [handleHideBtn, handleHideList]);

    const { showMenu, setElement } = useDropDownHide(handleHideListBlur);

    const handleShowList = useCallback(() => {
        if (secondTimerListRef.current) {
            clearTimeout(secondTimerListRef.current);
            secondTimerListRef.current = null;
            setListShow(true);
            return;
        }
        if (firstTimerListRef.current) {
            clearTimeout(firstTimerListRef.current);
            firstTimerListRef.current = null;
        }
        setListShow(true);
        showMenu(true);
        firstTimerListRef.current = setTimeout(() => {
            setListFadeIn(true);
            firstTimerListRef.current = null;
        }, 100);
    }, [showMenu]);

    useEffect(() => {
        const parent = parentRef.current;
        if (parent) {
            parent.addEventListener('mouseenter', handleShowBtn);
            parent.addEventListener('mouseleave', handleHideBtn);
        }
        return () => {
            if (parent) {
                parent.removeEventListener('mouseenter', handleShowBtn);
                parent.removeEventListener('mouseleave', handleHideBtn);
            }
        };
    }, [handleHideBtn, handleShowBtn, parentRef]);

    useEffect(() => {
        setElement(elementRef.current);
    }, [setElement]);

    return (
        <div ref={elementRef} className={styles.cardDots}>
            {(btnShow || listShow) && (
                <button
                    onClick={() => {
                        if (!listShow) {
                            handleShowList();
                        } else {
                            handleHideList();
                        }
                    }}
                    className={`${styles.btnDot}${btnFadeIn ? ` ${styles.zoomIn}` : ''}`}
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
