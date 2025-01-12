import { useEffect, useState } from 'react';
import CardDot from '../../../../../../../Shared/CardDot/CardDot/CardDot';

function EditGameCardList({
	parentRef,
	cardInfo,
	cards,
	setCards,
	onIndividualDelete,
	onMoveLeft,
	onMoveRight,
}) {
	const [list, setList] = useState([]);

	useEffect(() => {
		if (cards.cards.length === 0) {
			return;
		}

		const handleMove = direction => {
			setCards(prev => {
				const newCards = [...prev.cards];
				const index = newCards.findIndex(card => card.id === cardInfo.id);

				if (direction === 'left') onMoveLeft(cardInfo.id);
				else onMoveRight(cardInfo.id);
				const temp = newCards.splice(index, 1)[0];
				newCards.splice(direction === 'left' ? index - 1 : index + 1, 0, temp);
				return { ...prev, cards: newCards };
			});
		};

		const newList = [
			{
				name: 'Delete',
				event: () => {
					const newCards = cards.cards.filter(card => card.id !== cardInfo.id);
					setCards(prev => ({ ...prev, cards: newCards }));
					onIndividualDelete(cardInfo.id);
				},
			},
		];

		switch (cardInfo.id) {
			case cards.cards[0].id:
				if (cards.cards.length !== 1) {
					newList.push({
						name: 'Move Right',
						event: () => handleMove('right'),
					});
				}
				break;
			case cards.cards[cards.cards.length - 1].id:
				newList.push({
					name: 'Move Left',
					event: () => handleMove('left'),
				});

				break;
			default:
				newList.push(
					{
						name: 'Move Left',
						event: () => handleMove('left'),
					},
					{
						name: 'Move Right',
						event: () => handleMove('right'),
					}
				);
				break;
		}
		setList(newList);
	}, [cardInfo.id, cards.cards, onIndividualDelete, onMoveLeft, onMoveRight, setCards]);

	return <CardDot parentRef={parentRef} lists={list} />;
}

export default EditGameCardList;
