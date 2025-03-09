import { useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditAdaptiveCardsLinkField from '../Components/EditAdaptiveCardsLinkField/EditAdaptiveCardsLinkField';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function editHeaderComponent(index, link) {
	return <EditAdaptiveCardsLinkField index={index} link={link} />;
}

function EditAdaptiveGameCards({ dataRef, defaultItems, parentIndex }) {
	// 0 means price footer, 1 means 1 button footer, -1 means 2 button footer
	const [adaptiveFooter, setAdaptiveFooter] = useState([0, 1, -1]);

	const [adaptiveGameCard, setAdaptiveGameCard] = useState(defaultItems);

	const { cloneObject } = useObjectUtilities();

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onImageUpload: (file, index) => {
				setAdaptiveGameCard(pre => {
					const newAdaptiveGameCard = cloneObject(pre);
					newAdaptiveGameCard[index].image = URL.createObjectURL(file);
					// dataRef.current[index] = adaptiveCard;
					return newAdaptiveGameCard;
				});
			},
		};
	}

	console.log(adaptiveGameCard);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveCards
				items={adaptiveGameCard}
				isEditing
				index={parentIndex}
				editingHeader={editHeaderComponent}
				onImageUpload={eventRefs.current.onImageUpload}
			/>
			<EditAdaptiveGameCardsButtons />
		</div>
	);
}
export default EditAdaptiveGameCards;
