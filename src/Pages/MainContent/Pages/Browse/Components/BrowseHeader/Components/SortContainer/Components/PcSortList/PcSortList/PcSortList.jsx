import useAppearDisappear from '../../../../../../../../../../../Hooks/useAppearDisappear';
import SortList from '../../SortList/SortList';
import SortButton from '../SortButton/SortButton';
import styles from './PcSortList.module.css';

const PcSortList = ({ sort, state, dropDownRef, setFilterSort, handleChange }) => {
    const { show, fadeIn } = useAppearDisappear(!sort, false);
    return (
        <>
            <SortButton dropDownRef={dropDownRef.current} state={state} show={show} setShow={setFilterSort} />
            {show && (
                <div className={`${styles.sortLists}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
                    <SortList state={state} setShow={setFilterSort} handleChange={handleChange} />
                </div>
            )}
        </>
    );
};
export default PcSortList;
