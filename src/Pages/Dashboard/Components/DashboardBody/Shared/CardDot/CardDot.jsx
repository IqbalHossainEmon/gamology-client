import { useCallback, useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDot.module.css';

const CardDot = ({ item, lists, parentRef }) => {
    const [btnShow, setBtnShow] = useState(false);
    const [listShow, setListShow] = useState(false);

    const elementRef = useRef(null);

    const btnShowRef = useRef(btnShow);
    btnShowRef.current = btnShow;

    const listShowRef = useRef(listShow);
    listShowRef.current = listShow;

    const handleShowBtn = useCallback(() => {
        if (!btnShowRef.current) {
            setBtnShow(true);
        }
    }, []);
    const handleHideBtn = useCallback(() => {
        if (btnShowRef.current && !listShowRef.current) {
            setBtnShow(false);
        }
    }, []);

    const touchAble = useIsTouchAble();
    const screenWidth = useScreenWidth();

    const isEventAdded = useRef(false);

    useEffect(() => {
        const parent = parentRef.current;
        const isTouchAble = touchAble();
        if (parent && !isTouchAble && !isEventAdded.current) {
            parent.addEventListener('mousemove', handleShowBtn);
            parent.addEventListener('mouseleave', handleHideBtn);
            isEventAdded.current = true;
            if (btnShowRef.current) {
                setBtnShow(false);
            }
        } else if (isTouchAble && isEventAdded.current) {
            parent.removeEventListener('mousemove', handleShowBtn);
            parent.removeEventListener('mouseleave', handleHideBtn);
            isEventAdded.current = false;
            setBtnShow(true);
        } else if (isTouchAble && !isEventAdded.current) {
            setBtnShow(true);
        }
        return () => {
            if (parent) {
                parent.removeEventListener('mousemove', handleShowBtn);
                parent.removeEventListener('mouseleave', handleHideBtn);
                isEventAdded.current = false;
            }
        };
    }, [handleHideBtn, handleShowBtn, parentRef, touchAble, screenWidth]);

    const { show, fadeIn } = useAppearDisappear(btnShow);

    const handleHide = useCallback(() => {
        const isTouchAble = touchAble();
        if (!isTouchAble) setBtnShow(false);
        setListShow(false);
    }, [touchAble]);

    const { setElement, stopMenu, showMenu } = useDropDownHide(handleHide);

    return (
        (show || listShow) && (
            <div ref={elementRef} className={styles.cardDots}>
                <button
                    onClick={() => {
                        if (!listShow) {
                            setListShow(true);
                            setElement(elementRef.current);
                            showMenu();
                        } else {
                            setListShow(false);
                            stopMenu();
                        }
                    }}
                    className={`${styles.btnDot}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
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
                <CardDotList
                    lists={lists}
                    listShow={listShow}
                    handleHide={handleHide}
                    item={item}
                    parentRef={elementRef}
                />
            </div>
        )
    );
};

export default CardDot;
