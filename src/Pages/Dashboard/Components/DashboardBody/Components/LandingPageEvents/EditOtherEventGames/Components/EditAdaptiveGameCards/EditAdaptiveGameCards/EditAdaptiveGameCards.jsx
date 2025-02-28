import { useState } from 'react';
import AdaptiveGameCards from '../../../../../../../../../../Shared/AdaptiveGameCards/AdaptiveGameCards/AdaptiveGameCards';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function EditAdaptiveGameCards({ dataRef, defaultItems, index }) {
	// 0 means price footer, 1 means 1 button footer, -1 means 2 button footer
	const [adaptiveFooter, setadaptiveFooter] = useState([0, 1, -1]);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveGameCards items={defaultItems} isEditing index={index} />
			<EditAdaptiveGameCardsButtons />
		</div>
	);
}
export default EditAdaptiveGameCards;
