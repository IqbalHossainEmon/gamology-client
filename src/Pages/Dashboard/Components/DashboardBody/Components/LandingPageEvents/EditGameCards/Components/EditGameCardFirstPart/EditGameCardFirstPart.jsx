import useModal from '../../../../../../../../../Utils/Hooks/useModal';
import NormalButtonWithEffects from '../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardFirstPart.module.css';

function EditGameCardFirstPart({ gameCards, setGameCards, cardsRef, errorMessages, errorChange }) {
	const handleMoveLeftRight = (id, index, isLeft) => {
		const cardIndex = cardsRef.current[0].cards[index].cards.findIndex(card => card.id === id);

		const temp = cardsRef.current[0].cards[index].cards.splice(cardIndex, 1)[0];
		cardsRef.current[0].cards[index].cards.splice(
			isLeft ? cardIndex - 1 : cardIndex + 1,
			0,
			temp
		);
	};

	const setModal = useModal();

	return (
		<div className={styles.editGameCardFirstPart}>
			<h3 className={styles.firstRowHeader}>Edit games after main banner</h3>
			<div className={styles.editGameCardFirstPartContainer}>
				{gameCards.cards.map((gameCard, index) => (
					<div key={gameCard.id} className={styles.editGameCardContainer}>
						<EditGameCardContainer
							defaultData={gameCard}
							id={`first-games-${gameCard.id}`}
							onIndividualDelete={id => {
								cardsRef.current[0].cards[index].cards = cardsRef.current[0].cards[
									index
								].cards.filter(card => card.id !== id);
							}}
							errorMessage={errorMessages[index]}
							errorChange={errorChange}
							onMoveLeft={id => handleMoveLeftRight(id, index, true)}
							onMoveRight={id => handleMoveLeftRight(id, index)}
							setHeader={header => {
								cardsRef.current[0].cards[index].header = header;
							}}
							setGameCard={card => {
								cardsRef.current[0].cards[index].cards.push(card);
							}}
							onClear={() => {
								cardsRef.current[0].cards[index].cards = [];
							}}
							onReset={data => {
								cardsRef.current[0].cards[index] = data;
							}}
							onDelete={() => {
								if (cardsRef.current[0].cards.length === 1) {
									setModal({
										title: 'Cannot delete',
										body: (
											<p>
												You can not Delete the last game cards after the
												main banner
											</p>
										),
										footer: (
											<NormalButtonWithEffects
												text='Ok'
												onClick={() =>
													setModal({
														title: null,
														body: null,
														footer: null,
													})
												}
												className={styles.okBtn}
											/>
										),
									});
									return;
								}

								return () => {
									setGameCards(prev => {
										const newPrev = [...prev];
										newPrev[0].cards.splice(index, 1);
										cardsRef.current[0].cards.splice(index, 1);
										return newPrev;
									});
								};
							}}
						/>
					</div>
				))}
			</div>
			{!!gameCards.cards[1] || (
				<NormalButtonWithEffects
					onClick={() =>
						setGameCards(prev => {
							const newPrev = [...prev];
							newPrev[0].cards.push({ id: Date.now(), header: '', cards: [] });
							cardsRef.current[0].cards.push({
								id: Date.now(),
								header: '',
								cards: [],
							});
							return newPrev;
						})
					}
					text='Add one more +'
				/>
			)}
		</div>
	);
}
export default EditGameCardFirstPart;
