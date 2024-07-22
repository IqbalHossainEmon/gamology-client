import { useEffect, useRef } from 'react';
import useHideShowFadeInOut from '../../../../../../../../Hooks/useHideShowFadeInOut';
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

    const screenWidth = useScreenWidth();

    const { show, fadeIn } = useHideShowFadeInOut(sort, screenWidth > 768);

    const dropDownRef = useRef();

    useEffect(() => {
        filterSortRef.sort = dropDownRef.current;
    }, [dropDownRef, filterSortRef]);

    return (
        <>
            <div
                ref={dropDownRef}
                className={`${styles.sortContainer} ${sort && screenWidth < 769 ? styles.hidden : ''}`}
            >
                {screenWidth > 768 && (
                    <SortButton dropDownRef={dropDownRef.current} state={state} show={show} setShow={setFilterSort} />
                )}
                {show && screenWidth > 768 && (
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
                    <ScreenShadow show={sort} />
                </div>
            )}
        </>
    );
}
