import useObjectUtilities from '../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardFirstPart.module.css';

function EditGameCardFirstPart({ gameCards, setGameCards, cardsRef }) {
	const { cloneObject } = useObjectUtilities();

	return (
		<div className={styles.editGameCardFirstPart}>
			<h3 className={styles.firstRowHeader}>First after main banner</h3>
			{gameCards.map((gameCard, index) => (
				<EditGameCardContainer
					key={gameCard.id}
					defaultData={gameCard}
					id={gameCard.id}
					setHeader={header => {
						cardsRef.current[0][index].header = header;
					}}
					setGameCard={card => {
						cardsRef.current[0][index].cards.push(card);
					}}
					onClear={() =>
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0][index].cards = [];
							cardsRef.current[0][index].cards = [];
							return newPrev;
						})
					}
					onReset={data => {
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0][index] = data;
							cardsRef.current[0][index] = data;
							return newPrev;
						});
					}}
					onDelete={() => {
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0].splice(index, 1);
							cardsRef.current[0].splice(index, 1);
							return newPrev;
						});
					}}
				/>
			))}

			{!!gameCards[1] || (
				<NormalButtonWithEffects
					onClick={() =>
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0].push({ id: Date.now(), header: '', cards: [] });
							cardsRef.current[0].push({ id: Date.now(), header: '', cards: [] });
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
