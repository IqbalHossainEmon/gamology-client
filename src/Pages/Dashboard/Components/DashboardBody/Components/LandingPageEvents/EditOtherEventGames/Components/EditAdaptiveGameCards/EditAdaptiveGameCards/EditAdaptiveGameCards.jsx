import { useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditAdaptiveCardsLinkField from '../Components/EditAdaptiveCardsLinkField/EditAdaptiveCardsLinkField';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function editHeaderComponent(index, link, setLink) {
	return <EditAdaptiveCardsLinkField index={index} link={link} setLink={setLink} blurSet />;
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
					dataRef.current[index] = newAdaptiveGameCard[index];
					return newAdaptiveGameCard;
				});
			},
			onFieldChange: (field, value, index) => {
				dataRef.current[parentIndex].cards[index][field] = value;
			},
		};
	}

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveCards
				items={adaptiveGameCard}
				isEditing
				index={parentIndex}
				editingHeader={editHeaderComponent}
				onFieldChange={eventRefs.current.onFieldChange}
				onImageUpload={eventRefs.current.onImageUpload}
			/>
			<EditAdaptiveGameCardsButtons defaultData={dataRef.current} />
		</div>
	);
}
export default EditAdaptiveGameCards;
