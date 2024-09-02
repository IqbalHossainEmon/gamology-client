import styles from './ApplyButton.module.css';

export default function ApplyButton({ filterState, state, dispatch, setShow }) {
	const newFilterState = { ...filterState };
	const newState = { ...state };

	if (state.ShowOnlyFreeGames) {
		delete newFilterState.price;
		delete newState.price;
	}

	return (
		<div className={styles.buttonContainer}>
			<button
				className={`${styles.applyButton} ${
					JSON.stringify(newFilterState) !== JSON.stringify(newState)
						? styles.activeButton
						: styles.disableButton
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
