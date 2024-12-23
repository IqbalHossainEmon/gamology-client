import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import styles from './ApplyButton.module.css';

export default function ApplyButton({ filterState, state, dispatch, setShow }) {
	const { areObjectsEqual } = useObjectUtilities();

	return (
		<div className={styles.buttonContainer}>
			<button
				className={`${styles.applyButton} ${
					areObjectsEqual(filterState, state) ? styles.disableButton : styles.activeButton
				}`}
				onClick={() => {
					setShow('filter');
					dispatch({ type: 'filterChange', filter: state });
				}}
				type='button'
			>
				Apply Change
			</button>
		</div>
	);
}
