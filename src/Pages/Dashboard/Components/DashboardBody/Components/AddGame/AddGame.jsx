import GameInfoField from '../GameInfoField/GameInfoField/GameInfoField';
import styles from './AddGame.module.css';

function AddGame() {
	const handleGameInfo = data => {
		console.log(data);
	};

	return (
		<div className={styles.addGames}>
			<GameInfoField handleGameInfo={handleGameInfo} />
		</div>
	);
}
export default AddGame;
