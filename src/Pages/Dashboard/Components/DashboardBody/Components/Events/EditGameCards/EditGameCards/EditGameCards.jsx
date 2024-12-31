import EditGameCardContainer from '../Components/EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCards.module.css';

function EditGameCards() {
	return (
		<div className={styles.editGameCards}>
			<h2 className={styles.editBannerHeader}>Edit Game Cards</h2>
			<EditGameCardContainer />
		</div>
	);
}
export default EditGameCards;
