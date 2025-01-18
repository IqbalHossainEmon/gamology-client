import useAppearDisappear from '../../../../../../../../../../../Utils/Hooks/useAppearDisappear';
import SortList from '../../SortList/SortList';
import SortButton from '../SortButton/SortButton';
import styles from './PcSortList.module.css';

function PcSortList({ sort, state, dropDownRef, setSort, handleChange }) {
	const [show, fadeIn] = useAppearDisappear(sort, true);
	return (
		<>
			<SortButton
				dropDownRef={dropDownRef.current}
				setShow={setSort}
				show={show}
				state={state}
			/>
			{show ? (
				<div className={`${styles.sortLists}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
					<SortList handleChange={handleChange} setShow={setSort} state={state} />
				</div>
			) : null}
		</>
	);
}
export default PcSortList;
