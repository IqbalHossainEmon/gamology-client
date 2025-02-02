import { useEffect, useRef } from 'react';
import ScreenShadow from '../../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import useDropDownHide from '../../../../../../../../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../../../../../../../../Utils/Hooks/useScreenWidth';
import useBrowseSort from '../../../../../Utils/Hooks/useBrowseSort/useBrowseSort';
import BrowseCloseButton from '../../../../Shared/BrowseCloseButton/CloseButton';
import PcSortList from '../Components/PcSortList/PcSortList/PcSortList';
import SortList from '../Components/SortList/SortList';
import styles from './SortContainer.module.css';

export default function SortContainer({ state, handleChange }) {
	const { sort, setSort } = useBrowseSort();

	const { widthInRem } = useScreenWidth();
	const dropDownRef = useRef();

	const { setElement, onHide, showMenu } = useDropDownHide(setSort);

	useEffect(() => {
		setElement(dropDownRef.current);
	}, [setElement]);

	const timerId = useRef(null);

	useEffect(() => {
		if (sort) {
			timerId.current = setTimeout(() => {
				showMenu();
				timerId.current = null;
			}, 300);
		} else {
			if (timerId.current) {
				clearTimeout(timerId.current);
				timerId.current = null;
			}
			onHide();
		}
	}, [sort, onHide, showMenu]);

	return (
		<>
			<div
				className={`${styles.sortContainer}${widthInRem < 48.0625 && sort ? '' : ` ${styles.hidden}`}`}
				ref={dropDownRef}
			>
				{widthInRem > 48 && (
					<PcSortList
						dropDownRef={dropDownRef}
						handleChange={handleChange}
						setSort={setSort}
						sort={sort}
						state={state}
					/>
				)}
				{widthInRem < 48.0625 && (
					<div className={styles.sortDropDown}>
						<ScrollBar>
							<div className={styles.sortLists}>
								<h2>Sort by</h2>
								<SortList
									handleChange={handleChange}
									setShow={setSort}
									state={state}
								/>
							</div>
						</ScrollBar>
					</div>
				)}
				{widthInRem < 48.0625 && (
					<div className={styles.closeButton}>
						<BrowseCloseButton setState={setSort} />
					</div>
				)}
			</div>
			{widthInRem < 48.0625 && <ScreenShadow show={sort} zIndex={3} />}
		</>
	);
}
