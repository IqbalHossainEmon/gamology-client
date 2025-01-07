import { useEffect, useRef, useState } from 'react';
import GameCards from '../../../../../../../../../../Shared/GameCards/GameCards/GameCards';
import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import CardDot from '../../../../../../Shared/CardDot/CardDot/CardDot';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardAddCard from '../Components/EditGameCardAddCard/EditGameCardAddCard';
import styles from './EditGameCardContainer.module.css';

const handleExtraCard = (width, margin, handleCLick) => (
	<EditGameCardAddCard width={width} margin={margin} onClick={handleCLick} />
);

function EditGameCardContainer({
	defaultData,
	id,
	onClear,
	onDelete,
	onReset,
	setGameCard,
	setHeader,
}) {
	const [cards, setCards] = useState(defaultData || { header: '', cards: [] });

	const handleCardSelection = card => {
		setCards(prev => ({ ...prev, cards: [...prev.cards, card] }));
		setGameCard(card);
	};

	const { cloneObject } = useObjectUtilities();

	const firstDefaultData = useRef(cloneObject(defaultData));

	const setModal = useModal();

	const evenRef = useRef(null);

	if (!evenRef.current) {
		evenRef.current = (callback, isDelete) => {
			setModal({
				title: `Confirm ${isDelete ? 'Deletion' : 'Clearing'}`,
				body: <p>Are you sure you want to {isDelete ? 'delete' : 'clear'}?</p>,
				footer: (
					<div className={styles.deleteModalFooter}>
						<NormalButtonWithEffects
							className={`${styles.btn} ${styles.yesBtn}`}
							onClick={() => {
								callback();
								setModal({
									title: null,
									body: null,
									footer: null,
								});
							}}
							text='Yes'
						/>
						<NormalButtonWithEffects
							className={`${styles.btn} ${styles.noBtn}`}
							onClick={() => {
								setModal({
									title: null,
									body: null,
									footer: null,
								});
							}}
							text='No'
						/>
					</div>
				),
			});
		};
	}

	useEffect(() => {
		setCards(defaultData);
	}, [defaultData]);

	return (
		<section className={styles.gameCard}>
			<GameCards
				customHeader={
					<div className={styles.header}>
						<TextField
							field='input'
							placeholder='Write the title'
							htmlFor={`header-of-${id}`}
							defaultValue={cards.header}
							setState={value => {
								setCards(prev => ({ ...prev, header: value }));
								setHeader(value);
							}}
						/>
					</div>
				}
				items={cards.cards}
				extraCard={(width, margin) => handleExtraCard(width, margin, handleCardSelection)}
				scrollToLast
			>
				{(parentRef, cardInfo) => {
					const list = [
						{
							name: 'Delete',
							event: () => {
								const newCards = cards.cards.filter(
									card => card.id !== cardInfo.id
								);
								setCards(prev => ({ ...prev, cards: newCards }));
								// onDelete(cardInfo.index);
							},
						},
					];
					if (cards.cards.length === 0) {
						return;
					}
					if (
						cardInfo.id !== cards.cards[cards.cards.length - 1].id &&
						cardInfo.id !== cards.cards[0].id
					) {
						list.push(
							{
								name: 'Move Left',
								event: () => {
									const newCards = [...cards.cards];
									const index = newCards.findIndex(
										card => card.id === cardInfo.id
									);
									if (index > 0) {
										const temp = newCards[index];
										newCards[index] = newCards[index - 1];
										newCards[index - 1] = temp;
										setCards(prev => ({ ...prev, cards: newCards }));
									}
								},
							},
							{
								name: 'Move Right',
								event: () => {
									const newCards = [...cards.cards];
									const index = newCards.findIndex(
										card => card.id === cardInfo.id
									);
									if (index < newCards.length - 1) {
										const temp = newCards[index];
										newCards[index] = newCards[index + 1];
										newCards[index + 1] = temp;
										setCards(prev => ({ ...prev, cards: newCards }));
									}
								},
							}
						);
					} else if (cardInfo.id === cards.cards[0].id) {
						list.push({
							name: 'Move Right',
							event: () => {
								const newCards = [...cards.cards];
								const index = newCards.findIndex(card => card.id === cardInfo.id);
								if (index < newCards.length - 1) {
									const temp = newCards[index];
									newCards[index] = newCards[index + 1];
									newCards[index + 1] = temp;
									setCards(prev => ({ ...prev, cards: newCards }));
								}
							},
						});
					} else if (cardInfo.id === cards.cards[cards.cards.length - 1].id) {
						list.push({
							name: 'Move Left',
							event: () => {
								const newCards = [...cards.cards];
								const index = newCards.findIndex(card => card.id === cardInfo.id);
								if (index > 0) {
									const temp = newCards[index];
									newCards[index] = newCards[index - 1];
									newCards[index - 1] = temp;
									setCards(prev => ({ ...prev, cards: newCards }));
								}
							},
						});
					}

					return <CardDot parentRef={parentRef} lists={list} />;
				}}
			</GameCards>
			<div className={styles.headerBtnContainer}>
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={() => {
						if (cards.cards.length > 6) {
							evenRef.current(onClear);
						} else {
							onClear();
						}
					}}
					text='Clear'
				/>
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={() => {
						evenRef.current(onDelete, true);
					}}
					text='Delete'
				/>
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={() => {
						setCards(firstDefaultData.current);
						onReset(cloneObject(firstDefaultData.current));
					}}
					text='Reset'
				/>
			</div>
		</section>
	);
}
export default EditGameCardContainer;
