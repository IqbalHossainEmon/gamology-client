import useToast from '../../../../../../Hooks/useToast';
import GameInfoField from '../GameInfoField/GameInfoField/GameInfoField';
import styles from './AddGame.module.css';

function AddGame() {
	const { setToast } = useToast();

	const handleGameInfo = data => {
		console.log(data);
		setToast({
			title: 'Successful',
			message: 'Game added successfully',
			type: 'success',
		});
	};

	return (
		<div className={styles.addGames}>
			<GameInfoField handleGameInfo={handleGameInfo} />
		</div>
	);
}
export default AddGame;
