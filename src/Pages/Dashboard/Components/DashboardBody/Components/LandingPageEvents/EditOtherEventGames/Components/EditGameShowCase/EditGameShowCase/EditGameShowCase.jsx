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

const handleCardDotList = (items, setItems) =>
	function Inner(parentRef, item, parentIndex) {
		const getListHandler = () => {
			if (items[parentIndex].games.length === 0) {
				return [];
			}
			const { id } = item;

			const handleMove = direction => {
				setItems(prev => {
					const newItems = [...prev];
					const index = newItems[parentIndex].games.findIndex(card => card.id === id);

					const temp = newItems[parentIndex].games.splice(index, 1)[0];

					newItems[parentIndex].games.splice(
						direction === 'top' ? index - 1 : index + 1,
						0,
						temp
					);

					return newItems;
				});
			};

			const newList = [
				{
					name: 'Delete',
					event: () => {
						const newCards = items[parentIndex].games.filter(card => card.id !== id);
						setItems(prev => {
							const newItems = [...prev];
							newItems[parentIndex].games = newCards;
							return newItems;
						});
					},
				},
			];

			switch (id) {
				case items[parentIndex].games[0].id:
					if (items[parentIndex].games.length !== 1) {
						newList.push({
							name: 'Move Down',
							event: () => handleMove('down'),
						});
					}
					break;
				case items[parentIndex].games[items[parentIndex].games.length - 1].id:
					newList.push({
						name: 'Move Top',
						event: () => handleMove('top'),
					});

					break;
				default:
					newList.push(
						{
							name: 'Move Top',
							event: () => handleMove('top'),
						},
						{
							name: 'Move Down',
							event: () => handleMove('down'),
						}
					);
					break;
			}
			return newList;
		};

		item.parentIndex = parentIndex;

		return (
			<GameCardManagementMenu parentRef={parentRef} item={item} lists={getListHandler()} />
		);
	};

function EditGameShowCase({ dataRef, defaultItems, onDelete, parentIndex }) {
	const { cloneObject } = useObjectUtilities();

	const [items, setItems] = useState(cloneObject(defaultItems));

	const onclick = (index, game) => {
		setItems(prev => {
			const newPrev = [...prev];
			newPrev[index].games.push(game);
			dataRef.current[index].games.push(game);
			return newPrev;
		});
	};

	const setModal = useModal();

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase
				parentIndex={parentIndex}
				dotMenu={handleCardDotList(items, setItems)}
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
										onDelete(parentIndex);
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
