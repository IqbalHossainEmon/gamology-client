import styles from './SecondNavSearchFieldViewMoreButton.module.css';

function SecondNavSearchFieldViewMoreButton({ value, setShow }) {
	return (
		<button type='button' className={styles.btn} onClick={() => setShow(false)}>
			View More
		</button>
	);
}
export default SecondNavSearchFieldViewMoreButton;
