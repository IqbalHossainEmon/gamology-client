import GameCards from '../../../../../../Shared/GameCards/GameCards/GameCards';
import styles from './DiscoverGames.module.css';

function DiscoverGames({ header }) {
	return (
		<section className={styles.games}>
			<GameCards headerTitle={header} />
		</section>
	);
}
export default DiscoverGames;
