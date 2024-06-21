import { useCallback, useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import useFilterSortState from '../../../FilterGames/Components/useFilterSortState/useFilterSortState';
import CloseButton from '../../../Shared/CloseButton/CloseButton';
import SortButton from '../SortButton/SortButton';
import SortList from '../SortList/SortList';
import styles from './SortContainer.module.css';

export default function SortContainer({ state, handleChange }) {
    const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
    const { sort } = filterSortState;

    const [show, setShow] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const startTimeRef = useRef();
    const endTimeRef = useRef();

    const handleHideBtn = useCallback(() => {
        if (startTimeRef.current) {
            clearTimeout(startTimeRef.current);
            startTimeRef.current = null;
            setFadeIn(false);
            return;
        }
        if (endTimeRef.current) {
            return;
        }
        setFadeIn(false);
        endTimeRef.current = setTimeout(() => {
            setShow(false);
            window.removeEventListener('blur', handleHideBtn);
            endTimeRef.current = null;
        }, 200);
    }, []);

    const handleShow = useCallback(() => {
        if (endTimeRef.current) {
            clearTimeout(endTimeRef.current);
            endTimeRef.current = null;
            setFadeIn(true);
            return;
        }
        if (startTimeRef.current) {
            return;
        }
        setShow(true);
        startTimeRef.current = setTimeout(() => {
            setFadeIn(true);
            window.addEventListener('blur', handleHideBtn);
            startTimeRef.current = null;
        }, 60);
    }, [handleHideBtn]);

    useEffect(() => {
        switch (sort) {
            case true:
                handleShow();
                break;
            default:
                handleHideBtn();
                break;
        }
    }, [handleHideBtn, handleShow, sort]);

    const dropDownRef = useRef();

    useEffect(() => {
        filterSortRef.sort = dropDownRef.current;
    }, [dropDownRef, filterSortRef]);

    const screenWidth = useScreenWidth();

    return (
        <>
            <div
                ref={dropDownRef}
                className={`${styles.sortContainer} ${show && screenWidth < 769 ? styles.hidden : ''}`}
            >
                {screenWidth > 768 && (
                    <SortButton dropDownRef={dropDownRef.current} state={state} show={show} setShow={setFilterSort} />
                )}
                {!show && screenWidth > 768 && (
                    <div className={`${styles.sortLists}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
                        <SortList state={state} setShow={setFilterSort} handleChange={handleChange} />
                    </div>
                )}
                {screenWidth < 769 && (
                    <div className={styles.sortLists}>
                        <h2>Sort by</h2>
                        <SortList state={state} setShow={setFilterSort} handleChange={handleChange} />
                    </div>
                )}
                {screenWidth < 769 && (
                    <div className={styles.closeButton}>
                        <CloseButton setState={setFilterSort} state="sort" />
                    </div>
                )}
            </div>
            {screenWidth < 769 && (
                <div className={styles.shadow}>
                    <ScreenShadow show={!show} />
                </div>
            )}
        </>
    );
}
