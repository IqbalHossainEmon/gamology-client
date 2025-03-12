import useModal from '../../../../../../../../../Utils/Hooks/useModal';
import ButtonWithRipple from '../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardOtherPart.module.css';

function EditGameCardOtherPart({ gamesCards, cardsRef, setGameCards, errorMessages, errorChange }) {
	const handleMoveLeftRight = (id, outerIndex, index, isLeft) => {
		const cardIndex = cardsRef.current[outerIndex].cards[index].cards.findIndex(
			card => card.id === id
		);

		const temp = cardsRef.current[outerIndex].cards[index].cards.splice(cardIndex, 1)[0];
		cardsRef.current[outerIndex].cards[index].cards.splice(
			isLeft ? cardIndex - 1 : cardIndex + 1,
			0,
			temp
		);
	};

	const { setContent, hideModal } = useModal();

	return (
		<div className={styles.editGameCardOtherPart}>
			<h3>Edit game for rest of the page</h3>
			{gamesCards.map((gameCards, outerIn) => {
				const outerIndex = outerIn + 1;
				return (
					<div key={gameCards.id}>
						<h3>Part {outerIndex}</h3>
						<div key={gameCards.id} className={styles.editGameCardOtherPartContainer}>
							{gameCards.cards.map((gameCard, index) => (
								<div key={gameCard.id} className={styles.editGameCardContainer}>
									<EditGameCardContainer
										id={`other-parts-${gameCard.id}-${gameCards.id}`}
										defaultData={gameCard}
										onIndividualDelete={id => {
											cardsRef.current[outerIndex].cards[index].cards =
												cardsRef.current[outerIndex].cards[
													index
												].cards.filter(card => card.id !== id);
										}}
										errorMessage={errorMessages[outerIn]?.[index]}
										errorChange={errorChange}
										onMoveLeft={id =>
											handleMoveLeftRight(id, outerIndex, index, true)
										}
										onMoveRight={id =>
											handleMoveLeftRight(id, outerIndex, index)
										}
										setHeader={header => {
											cardsRef.current[outerIndex].cards[index].header =
												header;
										}}
										setGameCard={card => {
											cardsRef.current[outerIndex].cards[index].cards.push(
												card
											);
										}}
										onClear={() => {
											cardsRef.current[outerIndex].cards[index].cards = [];
										}}
										onReset={data => {
											cardsRef.current[outerIndex].cards[index] = data;
										}}
										onDelete={() => {
											if (gameCards.cards.length === 1) {
												setContent({
													title: 'Confirm Deletion',
													body: (
														<>
															<p>
																Deleting the last game cards will
																remove the whole section.
															</p>
															<p>Are you sure you want to delete?</p>
														</>
													),
													footer: (
														<div className={styles.btnContainer}>
															<ButtonWithRipple
																onClick={() => {
																	setGameCards(prev => {
																		const newPrev = [...prev];
																		newPrev.splice(
																			outerIndex,
																			1
																		);
																		cardsRef.current.splice(
																			outerIndex,
																			1
																		);
																		return newPrev;
																	});
																	hideModal();
																}}
																className={`${styles.btn} ${styles.yesBtn}`}
															>
																Yes
															</ButtonWithRipple>
															<ButtonWithRipple
																onClick={() => {
																	hideModal();
																}}
																className={`${styles.btn} ${styles.noBtn}`}
															>
																No
															</ButtonWithRipple>
														</div>
													),
												});
												return;
											}
											return () =>
												setGameCards(prev => {
													const newPrev = [...prev];
													newPrev[outerIndex].cards.splice(index, 1);
													cardsRef.current[outerIndex].cards.splice(
														index,
														1
													);
													return newPrev;
												});
										}}
									/>
								</div>
							))}
						</div>
						{!!gameCards.cards[2] || (
							<ButtonWithRipple
								onClick={() =>
									setGameCards(prev => {
										const newPrev = [...prev];
										newPrev[outerIndex].cards.push({
											id: Date.now(),
											header: '',
											cards: [],
										});
										cardsRef.current[outerIndex].cards.push({
											id: Date.now(),
											header: '',
											cards: [],
										});
										return newPrev;
									})
								}
							>
								Add one more +
							</ButtonWithRipple>
						)}
					</div>
				);
			})}
		</div>
	);
}
export default EditGameCardOtherPart;
