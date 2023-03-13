import { useEffect, useRef } from 'react';
import useFilterSortState from '../../../../../../Hooks/useFilterSortState';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../Shared/ScreenShadow/ScreenShadow';
import CloseButton from '../../../Shared/CloseButton/CloseButton';
import SortButton from '../SortButton/SortButton';
import SortList from '../SortList/SortList';
import styles from './SortContainer.module.css';

export default function SortContainer({ state, handleChange }) {
  const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
  const { sort: show } = filterSortState;

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
          <SortButton
            dropDownRef={dropDownRef.current}
            state={state}
            show={show}
            setShow={setFilterSort}
          />
        )}
        <div className={styles.sortLists} {...(show && screenWidth > 769 && { hidden: true })}>
          {screenWidth < 769 && <h2>Sort by</h2>}
          <SortList state={state} setShow={setFilterSort} handleChange={handleChange} />
        </div>
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
