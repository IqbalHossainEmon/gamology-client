import SortContainer from '../Components/SortContainer/SortContainer/SortContainer';

import styles from './BrowseHeader.module.css';

export default function BrowseHeader({ handleChange, state }) {
	return (
		<div className={styles.browseHeader}>
			<h2 className={styles.numberOfGames}>{state.numberOfGames} Games</h2>
			<SortContainer handleChange={handleChange} state={state} />
		</div>
	);
}
