import useAppearDisappear from '../../../../../../../../../../../Hooks/useAppearDisappear';
import SortList from '../../SortList/SortList';
import SortButton from '../SortButton/SortButton';
import styles from './PcSortList.module.css';

function PcSortList({ sort, state, dropDownRef, setFilterSort, handleChange }) {
	const [show, fadeIn] = useAppearDisappear(!sort, false);
	return (
		<>
			<SortButton
				dropDownRef={dropDownRef.current}
				setShow={setFilterSort}
				show={show}
				state={state}
			/>

			{show ? (
				<div className={`${styles.sortLists}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
					<SortList handleChange={handleChange} setShow={setFilterSort} state={state} />
				</div>
			) : null}
		</>
	);
}
export default PcSortList;
