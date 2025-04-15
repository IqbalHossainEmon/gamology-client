import { useRef, useState } from 'react';

import RotateArrow from '../../../../../../../../../../../Shared/RotateArrow/RotateArrow';
import useDropDownHide from '../../../../../../../../../../../Utils/Hooks/useDropDownHide';
import IndiGameOrderByListContainer from '../Components/IndiGameOrderByListContainer/IndiGameOrderByListContainer';

import styles from './IndiGameOrderBy.module.css';

export default function IndiGameOrderBy({ handleSort }) {
	const btnRef = useRef(null);
	const listRef = useRef(null);
	const [orderBy, setOrderBy] = useState([
		{ id: 0, name: 'Most positive', link: 'most-positive', active: true },
		{ id: 1, name: 'Most critical', link: 'most-critical', active: false },
		{ id: 3, name: 'Most recent', link: 'most-recent', active: false },
	]);
	const [show, setShow] = useState(false);
	const { showMenu, setElement, onHide } = useDropDownHide(setShow);

	return (
		<div className={styles.individualGameOrderBy}>
			<button
				className={styles.activeOrderContainer}
				onClick={() => {
					setShow(prev => {
						if (!prev) {
							showMenu();
							setElement([btnRef.current, listRef.current]);
						} else {
							onHide();
							setElement(null);
						}
						return !prev;
					});
				}}
				ref={btnRef}
				type='button'
			>
				<p className={styles.activeOrder}>
					Order By:{' '}
					<span className={styles.orderChangeablePart}>
						{orderBy.filter(order => order.active)[0].name}
					</span>
				</p>
				<div className={styles.rotateArrow}>
					<RotateArrow state={show} />
				</div>
			</button>
			<IndiGameOrderByListContainer
				handleSort={handleSort}
				listRef={listRef}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				setShow={setShow}
				state={show}
			/>
		</div>
	);
}
