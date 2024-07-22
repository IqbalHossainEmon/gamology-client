import { useRef } from 'react';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptionList from '../Components/FilterOptionList/FilterOptionList';
import styles from './FilterMobileScroll.module.css';

const FilterMobileScroll = ({
    screenWidth,
    options,
    state,
    setState,
    limits,
    setFilterSort,
    dispatch,
    filterState,
}) => {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    return (
        <div className={styles.filterContainer}>
            <div ref={parentRef} className={styles.parentContainer}>
                <div ref={childRef} className={styles.childContainer}>
                    {screenWidth < 769 && <h2 className={styles.filterText}>Filters</h2>}
                    <FilterOptionList options={options} state={state} setState={setState} limits={limits} />
                    <ApplyButton setShow={setFilterSort} dispatch={dispatch} filterState={filterState} state={state} />
                </div>
            </div>
            {screenWidth < 769 && <ScrollBar parentRef={parentRef} childRef={childRef} />}
        </div>
    );
};
export default FilterMobileScroll;
