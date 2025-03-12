import { useRef } from 'react';
import useObjectUtilities from '../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditAdaptiveGameCardsButtons.module.css';

function EditAdaptiveGameCardsButtons({
	adaptiveGameCards,
	setAdaptiveGameCards,
	mainDataRef,
	parentIndex,
}) {
	const { cloneObject } = useObjectUtilities();

	const doesTitleExists = !!adaptiveGameCards[0].title;
	const doesDescriptionExists = !!adaptiveGameCards[0].description;

	const tempDataHolder = useRef({
		title: [],
		description: [],
	});

	return (
		<div className={styles.editAdaptiveGameCardsButtons}>
			<ButtonWithRipple
				onClick={() =>
					setAdaptiveGameCards(prev => {
						const newAdaptiveGameCards = cloneObject(prev);
						if (doesTitleExists) {
							newAdaptiveGameCards.map((card, index) => {
								tempDataHolder.current.title[index] = card.title;
								delete card.title;
								delete mainDataRef.current[parentIndex].cards[index].title;
								return card;
							});
						} else {
							newAdaptiveGameCards.map((card, index) => {
								card.title = tempDataHolder.current.title[index];
								return card;
							});
						}
						return newAdaptiveGameCards;
					})
				}
			>
				{doesTitleExists ? 'Remove' : 'Add'} Title
			</ButtonWithRipple>
			<ButtonWithRipple
				onClick={() =>
					setAdaptiveGameCards(prev => {
						const newAdaptiveGameCards = cloneObject(prev);
						if (doesDescriptionExists) {
							newAdaptiveGameCards.map((card, index) => {
								tempDataHolder.current.description[index] = card.description;
								delete card.description;
								delete mainDataRef.current[parentIndex].cards[index].description;
								return card;
							});
						} else {
							newAdaptiveGameCards.map((card, index) => {
								card.description = tempDataHolder.current.description[index];
								return card;
							});
						}
						return newAdaptiveGameCards;
					})
				}
			>
				{doesDescriptionExists ? 'Remove' : 'Add'} Description
			</ButtonWithRipple>
			<ButtonWithRipple>Add Footer Button</ButtonWithRipple>
		</div>
	);
}
export default EditAdaptiveGameCardsButtons;
