import NormalButtonWithEffects from '../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardFirstPart.module.css';

function EditGameCardFirstPart({ gameCards, setGameCards }) {
	return (
		<div className={styles.editGameCardFirstPart}>
			<h3 className={styles.firstRow}>First after main banner</h3>
			{gameCards.map(gameCard => (
				<EditGameCardContainer key={gameCard.id} defaultData={gameCard} id={gameCard.id} />
			))}
			{!!gameCards[1] || (
				<NormalButtonWithEffects
					onClick={() =>
						setGameCards(prev => [
							[...prev[0], { id: Date.now(), header: '', cards: [] }],
							...prev.slice(1),
						])
					}
					text='Add one more +'
				/>
			)}
		</div>
	);
}
export default EditGameCardFirstPart;
