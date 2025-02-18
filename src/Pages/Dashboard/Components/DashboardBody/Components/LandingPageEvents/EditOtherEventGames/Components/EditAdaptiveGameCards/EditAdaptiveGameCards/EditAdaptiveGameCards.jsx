import AdaptiveGameCards from '../../../../../../../../../../Shared/AdaptiveGameCards/AdaptiveGameCards/AdaptiveGameCards';
import styles from './EditAdaptiveGameCards.module.css';

function EditAdaptiveGameCards({ dataRef, defaultItems }) {
	return (
		<div className={styles.editAdaptiveGameCards}>
			<div className={styles.editAdaptiveGameCardsSection}>
				<AdaptiveGameCards items={defaultItems} dataRef={dataRef} />
			</div>
		</div>
	);
}
export default EditAdaptiveGameCards;
