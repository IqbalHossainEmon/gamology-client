import { useRef, useState } from 'react';
import ButtonWithRipple from '../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import GameCardManagementMenu from '../../../../../Utils/GameCardManagementMenu';
import EditGameShowCaseConfirmModal from '../Components/EditGameShowCaseConfirmModal/EditGameShowCaseConfirmModal';
import EditGameShowCaseExtraCard from '../Components/EditGameShowCaseExtraCard/EditGameShowCaseExtraCard';
import styles from './EditGameShowCase.module.css';

function extraCard(index, onclick) {
	return <EditGameShowCaseExtraCard index={index} onclick={game => onclick(index, game)} />;
}

const handleCardDotList = (items, setItems, dataRef, outerIndex) =>
	function Inner(parentRef, item, parentIndex) {
		const { cloneObject } = useObjectUtilities();

		const getListHandler = () => {
			if (items[parentIndex].games.length === 0) {
				return [];
			}
			const { id } = item;

			const handleMove = direction => {
				let index;
				setItems(prev => {
					const newItems = cloneObject(prev);
					index = newItems[parentIndex].games.findIndex(card => card.id === id);

					newItems[parentIndex].games.splice(
						direction === 'top' ? index - 1 : index + 1,
						0,
						newItems[parentIndex].games.splice(index, 1)[0]
					);

					return newItems;
				});

				dataRef.current[outerIndex].games[parentIndex].games.splice(
					direction === 'top' ? index - 1 : index + 1,
					0,
					dataRef.current[outerIndex].games[parentIndex].games.splice(index, 1)[0]
				);
			};

			const newList = [
				{
					name: 'Delete',
					event: () => {
						const newCards = items[parentIndex].games.filter(card => card.id !== id);
						setItems(prev => {
							const newItems = cloneObject(prev);
							newItems[parentIndex].games = cloneObject(newCards);
							return newItems;
						});
						dataRef.current[outerIndex].games[parentIndex].games = newCards;
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
			const newPrev = cloneObject(prev);
			newPrev[index].games.push(game);
			return newPrev;
		});
		dataRef.current[parentIndex].games[index].games.push(game);
	};

	const { hideModal, setContent } = useModal();

	const titleValueResetRef = useRef([]);

	return (
		<>
			<GamesShowcase
				parentIndex={parentIndex}
				dotMenu={handleCardDotList(items, setItems, dataRef, parentIndex)}
				items={items}
				extraCard={index => extraCard(index, onclick)}
				dataRef={dataRef}
				setHeader={(val, index) => {
					dataRef.current[parentIndex].games[index].header = val;
				}}
				titleValueResetRef={titleValueResetRef}
			/>
			<div className={styles.btnContainer}>
				<ButtonWithRipple
					onClick={() => {
						setItems(cloneObject(defaultItems));
						dataRef.current[parentIndex].games = cloneObject(defaultItems);
						titleValueResetRef.current.forEach(func => !!func && func());
					}}
				>
					Reset
				</ButtonWithRipple>
				<ButtonWithRipple
					onClick={e =>
						setContent({
							title: 'Delete Game Showcase',
							body: <p>Are you sure you want to delete this game showcase?</p>,
							footer: (
								<EditGameShowCaseConfirmModal
									onConfirm={() => {
										hideModal();
										onDelete(parentIndex);
									}}
								/>
							),
							e,
						})
					}
				>
					Delete
				</ButtonWithRipple>
			</div>
		</>
	);
}

export default EditGameShowCase;
