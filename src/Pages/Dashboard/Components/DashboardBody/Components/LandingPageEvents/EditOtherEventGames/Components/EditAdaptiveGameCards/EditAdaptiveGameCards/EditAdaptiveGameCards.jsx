import { useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditAdaptiveCardDotMenu from '../Components/EditAdaptiveCardDotMenu/EditAdaptiveCardDotMenu';
import EditAdaptiveCardsLinkField from '../Components/EditAdaptiveCardsLinkField/EditAdaptiveCardsLinkField';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import styles from './EditAdaptiveGameCards.module.css';

function editHeaderComponent(
	index,
	link,
	setLink,
	cardRef,
	item,
	innerIndex,
	length,
	setAdaptiveGameCards
) {
	const lists = [
		{
			name: 'Delete',
			shouldHide: true,
			event: () =>
				setAdaptiveGameCards(pre => {
					const newAdaptiveGameCard = [...pre];
					newAdaptiveGameCard.splice(innerIndex, 1);
					return newAdaptiveGameCard;
				}),
		},
	];

	const handleMove = direction => {
		setAdaptiveGameCards(pre => {
			const newAdaptiveGameCard = [...pre];
			const currentItem = newAdaptiveGameCard.splice(innerIndex, 1)[0];
			const newIndex = direction === 'left' ? innerIndex - 1 : innerIndex + 1;
			newAdaptiveGameCard.splice(newIndex, 0, currentItem);
			return newAdaptiveGameCard;
		});
	};

	if (innerIndex === 0) {
		lists.push({
			name: 'Move Right',
			event: () => handleMove('right'),
		});
	} else if (innerIndex === length - 1) {
		lists.push({
			name: 'Move Left',
			event: () => handleMove('left'),
		});
	} else {
		lists.push(
			{
				name: 'Move Left',
				event: () => handleMove('left'),
			},
			{
				name: 'Move Right',
				event: () => handleMove('right'),
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
	const [adaptiveGameCards, setAdaptiveGameCards] = useState(defaultItems);

	const { cloneObject } = useObjectUtilities();

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onImageUpload: (file, index) => {
				setAdaptiveGameCards(pre => {
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
				items={adaptiveGameCards}
				isEditing
				index={parentIndex}
				editingHeader={(...props) => editHeaderComponent(...props, setAdaptiveGameCards)}
				onFieldChange={eventRefs.current.onFieldChange}
				onImageUpload={eventRefs.current.onImageUpload}
			/>
			<EditAdaptiveGameCardsButtons
				adaptiveGameCards={adaptiveGameCards}
				setAdaptiveGameCards={setAdaptiveGameCards}
				mainDataRef={dataRef}
				parentIndex={parentIndex}
			/>
		</div>
	);
}
export default EditAdaptiveGameCards;
