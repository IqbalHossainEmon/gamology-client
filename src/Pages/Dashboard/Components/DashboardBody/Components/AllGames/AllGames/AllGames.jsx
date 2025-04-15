import AllGamesLists from '../Components/AllGamesLists/AllGamesLists/AllGamesLists';

import styles from './AllGames.module.css';

function AllGames() {
	return (
		<div className={styles.allGames}>
			<AllGamesLists />
		</div>
	);
}
export default AllGames;
