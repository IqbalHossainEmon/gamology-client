import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import GameCards from '../../../../../../../../../../../Shared/GameCards/GameCards/GameCards';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardAddCard from '../../Components/EditGameCardAddCard/EditGameCardAddCard';
import EditGameCardList from '../Utils/EditGameCardList';
import styles from './EditGameCardContainer.module.css';

const handleExtraCard = (width, margin, handleCLick) => (
	<EditGameCardAddCard width={width} margin={margin} onClick={handleCLick} />
);

const handleCardList = (
	cards,
	setCards,
	onIndividualDelete,
	cloneObject,
	onMoveLeft,
	onMoveRight
) =>
	function inner(parentRef, cardInfo) {
		return (
			<EditGameCardList
				cards={cards}
				setCards={setCards}
				onIndividualDelete={onIndividualDelete}
				cloneObject={cloneObject}
				onMoveLeft={onMoveLeft}
				onMoveRight={onMoveRight}
				parentRef={parentRef}
				cardInfo={cardInfo}
			/>
		);
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

	const setModal = useModal();

	const evenRef = useRef(null);

	if (!evenRef.current) {
		evenRef.current = {
			handleModal: (callback, isDelete) => {
				setModal({
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
			},
			onDelete: () => {
				const callback = onDelete();
				if (errorShowRef.current) {
					setErrorShow(false);
				}
				if (callback) {
					evenRef.current.handleModal(callback, true);
				}
			},
			onClear: () => {
				if (errorShowRef.current) {
					setErrorShow(false);
				}
				if (cardsRef.current.length > 6) {
					evenRef.current.handleModal(() => {
						setCards(prev => ({ ...prev, cards: [] }));
						onClear();
					});
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
				dotMenu={handleCardList(
					cards,
					setCards,
					onIndividualDelete,
					cloneObject,
					onMoveLeft,
					onMoveRight
				)}
			/>
			<ErrorMessage errorMessage={errorMessage} enable={errorShow} />
			<div className={styles.headerBtnContainer}>
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={evenRef.current.onClear}
					text='Clear'
				/>
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={evenRef.current.onDelete}
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
