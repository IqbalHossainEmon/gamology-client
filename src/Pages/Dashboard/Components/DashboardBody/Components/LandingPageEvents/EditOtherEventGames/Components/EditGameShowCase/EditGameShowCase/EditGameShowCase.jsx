import { useState } from 'react';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import GameCardManagementMenu from '../../../../../Utils/GameCardManagementMenu';
import EditGameShowCaseConfirmModal from '../Components/EditGameShowCaseConfirmModal/EditGameShowCaseConfirmModal';
import EditGameShowCaseExtraCard from '../Components/EditGameShowCaseExtraCard/EditGameShowCaseExtraCard';
import styles from './EditGameShowCase.module.css';

function extraCard(index, onclick) {
	return <EditGameShowCaseExtraCard index={index} onclick={game => onclick(index, game)} />;
}

const handleCardDotList = (cards, setCards, onIndividualDelete, onMoveLeft, onMoveRight) =>
	function Inner(parentRef, cardInfo) {
		const getListHandler = () =>
			/* 	if (cards.cards.length === 0) {
				return [];
			}

			const { id } = cardInfo;

			const handleMove = direction => {
				setCards(prev => {
					const newCards = [...prev.cards];
					const index = newCards.findIndex(card => card.id === id);

					if (direction === 'left') onMoveLeft(id);
					else onMoveRight(id);
					const temp = newCards.splice(index, 1)[0];
					newCards.splice(direction === 'left' ? index - 1 : index + 1, 0, temp);
					return { ...prev, cards: newCards };
				});
			};

			const newList = [
				{
					name: 'Delete',
					event: () => {
						const newCards = cards.cards.filter(card => card.id !== id);
						setCards(prev => ({ ...prev, cards: newCards }));
						onIndividualDelete(id);
					},
				},
			];

			switch (id) {
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
			} */
			[
				{ name: 'Delete', event: () => console.log('Delete') },
				{ name: 'Move Left', event: () => console.log('Move Left') },
				{ name: 'Move Right', event: () => console.log('Move Right') },
			];
		return <GameCardManagementMenu parentRef={parentRef} lists={getListHandler()} />;
	};

function EditGameShowCase({ dataRef, defaultItems, onDelete }) {
	const { cloneObject } = useObjectUtilities();

	const [items, setItems] = useState(cloneObject(defaultItems));

	const onclick = (index, game) => {
		setItems(prev => {
			const temp = [...prev];
			temp[index].games.push(game);
			dataRef.current[index].games.push(game);
			return temp;
		});
	};

	const setModal = useModal();

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase
				dotMenu={handleCardDotList(items, setItems, null, null, null)}
				items={items}
				extraCard={index => extraCard(index, onclick)}
				dataRef={dataRef}
			/>
			<div className={styles.btnContainer}>
				<NormalButtonWithEffects
					text='Reset'
					onClick={() => {
						setItems(cloneObject(defaultItems));
						dataRef.current = cloneObject(defaultItems);
					}}
				/>
				<NormalButtonWithEffects
					text='Delete'
					onClick={() =>
						setModal({
							title: 'Delete Game Showcase',
							body: <p>Are you sure you want to delete this game showcase?</p>,
							footer: (
								<EditGameShowCaseConfirmModal
									onConfirm={() => {
										setModal({
											title: null,
											body: null,
											footer: null,
										});
										onDelete();
									}}
								/>
							),
						})
					}
				/>
			</div>
		</div>
	);
}
export default EditGameShowCase;
