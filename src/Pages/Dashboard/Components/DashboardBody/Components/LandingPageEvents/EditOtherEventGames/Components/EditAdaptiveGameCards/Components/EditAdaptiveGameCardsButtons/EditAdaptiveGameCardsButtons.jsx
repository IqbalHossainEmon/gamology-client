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
	const doesFooterExists = !!adaptiveGameCards[0].footer;

	const tempDataHolder = useRef({
		title: [],
		description: [],
		footer: [],
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
			<ButtonWithRipple
				onClick={() =>
					setAdaptiveGameCards(prev => {
						const newAdaptiveGameCards = cloneObject(prev);
						if (doesFooterExists) {
							newAdaptiveGameCards.map((card, index) => {
								tempDataHolder.current.footer[index] = card.footer;
								delete card.footer;
								delete mainDataRef.current[parentIndex].cards[index].footer;
								return card;
							});
						} else {
							newAdaptiveGameCards.map((card, index) => {
								card.footer = tempDataHolder.current.footer[index];
								return card;
							});
						}
						return newAdaptiveGameCards;
					})
				}
			>
				{doesFooterExists ? 'Remove' : 'Add'} Footer Button
			</ButtonWithRipple>
			{adaptiveGameCards.length < 3 && (
				<ButtonWithRipple
					onClick={() =>
						setAdaptiveGameCards(prev => {
							const newAdaptiveGameCards = cloneObject(prev);
							// copy a card from the existing array than just empty it
							const newCard = cloneObject(newAdaptiveGameCards[0]);
							Object.keys(newCard).forEach(element => {
								if (element === 'footer') newCard.footer = [];
								else newCard[element] = '';
							});
							newAdaptiveGameCards.push(newCard);
							return newAdaptiveGameCards;
						})
					}
				>
					Add Card
				</ButtonWithRipple>
			)}
		</div>
	);
}
export default EditAdaptiveGameCardsButtons;
