import styles from './SecondNavSearchFieldSeeAllButton.module.css';

function SecondNavSearchFieldSeeAllButton({ value, setShow, setValue }) {
	return (
		<>
			<button type='button' className={styles.btn} onClick={() => setShow(false)}>
				See more results
			</button>
			<button
				type='button'
				className={styles.btn}
				onClick={() => {
					setShow(false);
					setValue('');
				}}
			>
				Browse all titles
			</button>
		</>
	);
}
export default SecondNavSearchFieldSeeAllButton;
