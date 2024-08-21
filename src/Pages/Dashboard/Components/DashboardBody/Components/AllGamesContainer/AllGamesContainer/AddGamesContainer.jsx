import EditGame from '../Components/EditGame/EditGame/EditGame';
import styles from './AddGamesContainer.module.css';

function AddGamesContainer() {
	return (
		<div className={styles.addGamesContainer}>
			<EditGame />
		</div>
	);
}
export default AddGamesContainer;
