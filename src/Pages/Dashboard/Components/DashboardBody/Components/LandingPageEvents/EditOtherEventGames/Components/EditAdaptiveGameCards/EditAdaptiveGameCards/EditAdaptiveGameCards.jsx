import { useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditAdaptiveCardDotMenu from '../Components/EditAdaptiveCardDotMenu/EditAdaptiveCardDotMenu';
import EditAdaptiveCardsLinkField from '../Components/EditAdaptiveCardsLinkField/EditAdaptiveCardsLinkField';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function editHeaderComponent(index, link, setLink, cardRef, item, innerIndex, length) {
	const lists = [
		{
			name: 'Delete',
			shouldHide: true,
			event: () => console.log('Delete Card', index),
		},
	];

	if (innerIndex === 0) {
		lists.push({
			name: 'Move Right',
			event: detail => {
				console.log('Move Right', detail);
			},
		});
	} else if (innerIndex === length - 1) {
		lists.push({
			name: 'Move Left',
			event: detail => {
				console.log('Move Left', detail);
			},
		});
	} else {
		lists.push(
			{
				name: 'Move Left',
				event: detail => {
					console.log('Move Left', detail);
				},
			},
			{
				name: 'Move Right',
				event: detail => {
					console.log('Move Right', detail);
				},
			}
		);
	}
	return (
		<>
			<EditAdaptiveCardsLinkField index={index} link={link} setLink={setLink} blurSet />
			<EditAdaptiveCardDotMenu cardRef={cardRef} item={item} lists={lists} />
		</>
	);
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
