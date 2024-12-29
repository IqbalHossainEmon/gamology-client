import styles from './AllGamesHeaderSearchFieldShowAll.module.css';

function AllGamesHeaderSearchFieldShowAll({ value, setShow, setValue }) {
	return (
		<button type='button' className={styles.btn} onClick={() => setShow(false)}>
			Show All In The Page
		</button>
	);
}
export default AllGamesHeaderSearchFieldShowAll;
