import { useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import EditAdaptiveCardsLinkField from '../Components/EditAdaptiveCardsLinkField/EditAdaptiveCardsLinkField';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function EditHeaderComponent(index, link) {
	return <EditAdaptiveCardsLinkField index={index} link={link} />;
}

function EditAdaptiveGameCards({ dataRef, defaultItems, index }) {
	// 0 means price footer, 1 means 1 button footer, -1 means 2 button footer
	const [adaptiveFooter, setAdaptiveFooter] = useState([0, 1, -1]);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveCards
				items={defaultItems}
				isEditing
				index={index}
				editingHeader={EditHeaderComponent}
			/>
			<EditAdaptiveGameCardsButtons />
		</div>
	);
}
export default EditAdaptiveGameCards;
