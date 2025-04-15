import { useEffect, useRef, useState } from 'react';

import ButtonWithRipple from '../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import GameCards from '../../../../../../../../../../Shared/GameCards/GameCards/GameCards';
import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import GameCardManagementMenu from '../../../../../Utils/GameCardManagementMenu';
import EditGameCardAddCard from '../Components/EditGameCardAddCard/EditGameCardAddCard';

import styles from './EditGameCardContainer.module.css';

const handleExtraCard = (width, margin, handleCLick) => (
	<EditGameCardAddCard width={width} margin={margin} onClick={handleCLick} />
);

const handleCardDotList = (cards, setCards, onIndividualDelete, onMoveLeft, onMoveRight) =>
	function Inner(parentRef, cardInfo) {
		const getListHandler = () => {
			if (cards.cards.length === 0) {
				return [];
			}

			const { id } = cardInfo;

			const handleMove = direction => {
				setCards(prev => {
					const newCards = [...prev.cards];
					const index = newCards.findIndex(card => card.id === id);

					if (direction === 'left') {
						onMoveLeft(id);
					} else {
						onMoveRight(id);
					}
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
			}
			return newList;
		};

		return <GameCardManagementMenu lists={getListHandler()} parentRef={parentRef} />;
	};

function EditGameCardContainer({
	defaultData,
	id,
	onClear,
	onDelete,
	onReset,
	setGameCard,
	setHeader,
	onIndividualDelete,
	onMoveLeft,
	onMoveRight,
	errorMessage,
	errorChange,
}) {
	const [cards, setCards] = useState(defaultData || { header: '', cards: [] });

	const [errorShow, setErrorShow] = useState(false);

	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	const cardsRef = useRef(cards);
	cardsRef.current = cards;

	useEffect(() => {
		if (errorMessage) {
			setErrorShow(true);
		} else {
			setErrorShow(false);
		}
	}, [errorChange, errorMessage]);

	const handleCardSelection = card => {
		setCards(prev => ({ ...prev, cards: [...prev.cards, card] }));
		setGameCard(card);
		if (errorShowRef.current) {
			setErrorShow(false);
		}
	};

	const { cloneObject } = useObjectUtilities();

	const firstDefaultData = useRef(cloneObject(defaultData));

	const { setContent, hideModal } = useModal();

	const evenRef = useRef(null);

	if (!evenRef.current) {
		evenRef.current = {
			handleModal: (callback, isDelete, e) => {
				setContent({
					title: `Confirm ${isDelete ? 'Deletion' : 'Clearing'}`,
					body: (
						<>
							<p>
								Are you sure you want to {isDelete ? 'delete?' : 'clear the cards?'}
							</p>
							{!isDelete && (
								<p>
									<small>Note: This action cannot be undone.</small>
								</p>
							)}
						</>
					),
					footer: (
						<div className={styles.deleteModalFooter}>
							<ButtonWithRipple
								className={`${styles.btn} ${styles.yesBtn}`}
								onClick={() => {
									callback();
									hideModal();
								}}
							>
								Yes
							</ButtonWithRipple>
							<ButtonWithRipple
								className={`${styles.btn} ${styles.noBtn}`}
								onClick={() => {
									hideModal();
								}}
							>
								No
							</ButtonWithRipple>
						</div>
					),
					e,
				});
			},
			onDelete: e => {
				const callback = onDelete(e);
				if (errorShowRef.current) {
					setErrorShow(false);
				}
				if (callback) {
					evenRef.current.handleModal(callback, true, e);
				}
			},
			onClear: e => {
				if (errorShowRef.current) {
					setErrorShow(false);
				}
				if (cardsRef.current.length > 6) {
					evenRef.current.handleModal(
						() => {
							setCards(prev => ({ ...prev, cards: [] }));
							onClear();
						},
						false,
						e
					);
				} else {
					setCards(prev => ({ ...prev, cards: [] }));
					onClear();
				}
			},
		};
	}

	return (
		<section>
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
				/* This function is for dot menu in card */
				dotMenu={handleCardDotList(
					cards,
					setCards,
					onIndividualDelete,
					onMoveLeft,
					onMoveRight
				)}
			/>
			<ErrorMessage errorMessage={errorMessage} enable={errorShow} />
			<div className={styles.headerBtnContainer}>
				<ButtonWithRipple className={styles.btn} onClick={evenRef.current.onClear}>
					Clear
				</ButtonWithRipple>
				<ButtonWithRipple className={styles.btn} onClick={evenRef.current.onDelete}>
					Delete
				</ButtonWithRipple>
				<ButtonWithRipple
					className={styles.btn}
					onClick={() => {
						setCards(firstDefaultData.current);
						onReset(cloneObject(firstDefaultData.current));
					}}
				>
					Reset
				</ButtonWithRipple>
			</div>
		</section>
	);
}
export default EditGameCardContainer;
