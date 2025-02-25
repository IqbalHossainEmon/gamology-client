import AdaptiveGameCards from '../../../../../../../../../../Shared/AdaptiveGameCards/AdaptiveGameCards/AdaptiveGameCards';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function EditAdaptiveGameCards({ dataRef, defaultItems, index }) {
	console.log(defaultItems);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveGameCards items={defaultItems} isEditing index={index} />
			<EditAdaptiveGameCardsButtons />
		</div>
	);
}
export default EditAdaptiveGameCards;
