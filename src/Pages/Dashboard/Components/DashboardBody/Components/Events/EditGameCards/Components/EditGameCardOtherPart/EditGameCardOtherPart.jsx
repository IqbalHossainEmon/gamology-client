import useModal from '../../../../../../../../../Utils/Hooks/useModal';
import NormalButtonWithEffects from '../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardOtherPart.module.css';

function EditGameCardOtherPart({ gamesCards, cardsRef, setGameCards }) {
	const handleMoveLeftRight = (id, outerIndex, index, isLeft) => {
		const cardIndex = cardsRef.current[outerIndex].games[index].cards.findIndex(
			card => card.id === id
		);

		const temp = cardsRef.current[outerIndex].games[index].cards.splice(cardIndex, 1)[0];
		cardsRef.current[outerIndex].games[index].cards.splice(
			isLeft ? cardIndex - 1 : cardIndex + 1,
			0,
			temp
		);
	};

	const setModal = useModal();

	return (
		<div className={styles.editGameCardOtherPart}>
			<h3>Edit game for rest of the page</h3>
			{gamesCards.map((gameCards, outerIn) => {
				const outerIndex = outerIn + 1;
				return (
					<div key={gameCards.id}>
						<h3>Other Part {outerIndex}</h3>
						{gameCards.games.map((gameCard, index) => (
							<EditGameCardContainer
								key={gameCard.id}
								id={`other-parts-${gameCard.id}-${gameCards.id}`}
								defaultData={gameCard}
								onIndividualDelete={id => {
									cardsRef.current[outerIndex].games[index].cards =
										cardsRef.current[outerIndex].games[index].cards.filter(
											card => card.id !== id
										);
								}}
								onMoveLeft={id => handleMoveLeftRight(id, outerIndex, index, true)}
								onMoveRight={id => handleMoveLeftRight(id, outerIndex, index)}
								setHeader={header => {
									cardsRef.current[outerIndex].games[index].header = header;
								}}
								setGameCard={card => {
									cardsRef.current[outerIndex].games[index].cards.push(card);
								}}
								onClear={() =>
									setGameCards(prev => {
										const newPrev = [...prev];
										newPrev[outerIndex].games[index].cards = [];
										cardsRef.current[outerIndex].games[index].cards = [];
										return newPrev;
									})
								}
								onReset={data => {
									setGameCards(prev => {
										const newPrev = [...prev];
										newPrev[outerIndex].games[index] = data;
										cardsRef.current[outerIndex].games[index] = data;
										return newPrev;
									});
								}}
								onDelete={() => {
									if (gameCards.games.length === 1) {
										setModal({
											title: 'Confirm Deletion',
											body: (
												<>
													<p>
														Deleting the last game cards will remove the
														whole section.
													</p>
													<p>Are you sure you want to delete?</p>
												</>
											),
											footer: (
												<div className={styles.btnContainer}>
													<NormalButtonWithEffects
														text='Yes'
														onClick={() => {
															setGameCards(prev => {
																const newPrev = [...prev];
																newPrev.splice(outerIndex, 1);
																cardsRef.current.splice(
																	outerIndex,
																	1
																);
																return newPrev;
															});
															setModal({
																title: null,
																body: null,
																footer: null,
															});
														}}
														className={`${styles.btn} ${styles.yesBtn}`}
													/>
													<NormalButtonWithEffects
														text='No'
														onClick={() => {
															setModal({
																title: null,
																body: null,
																footer: null,
															});
														}}
														className={`${styles.btn} ${styles.noBtn}`}
													/>
												</div>
											),
										});
										return;
									}
									return () =>
										setGameCards(prev => {
											const newPrev = [...prev];
											newPrev[outerIndex].games.splice(index, 1);
											cardsRef.current[outerIndex].games.splice(index, 1);
											return newPrev;
										});
								}}
							/>
						))}
						{!!gameCards.games[2] || (
							<NormalButtonWithEffects
								onClick={() =>
									setGameCards(prev => {
										const newPrev = [...prev];
										newPrev[outerIndex].games.push({
											id: Date.now(),
											header: '',
											cards: [],
										});
										cardsRef.current[outerIndex].games.push({
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
			})}
		</div>
	);
}
export default EditGameCardOtherPart;
