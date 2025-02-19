import AdaptiveGameCards from '../../../../../../../../../../Shared/AdaptiveGameCards/AdaptiveGameCards/AdaptiveGameCards';
import styles from './EditAdaptiveGameCards.module.css';

function EditAdaptiveGameCards({ dataRef, defaultItems }) {
	console.log(defaultItems);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveGameCards items={defaultItems} />
		</div>
	);
}
export default EditAdaptiveGameCards;
