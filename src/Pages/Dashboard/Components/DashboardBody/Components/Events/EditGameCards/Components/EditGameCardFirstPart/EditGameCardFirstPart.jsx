import useModal from '../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardContainer from '../EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCardFirstPart.module.css';

function EditGameCardFirstPart({ gameCards, setGameCards }) {
	const { cloneObject } = useObjectUtilities();

	const setModal = useModal();

	return (
		<div className={styles.editGameCardFirstPart}>
			<h3 className={styles.firstRowHeader}>First after main banner</h3>
			{gameCards.map((gameCard, index) => (
				<EditGameCardContainer
					key={gameCard.id}
					defaultData={gameCard}
					id={gameCard.id}
					onClear={() =>
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0][index].cards = [];
							return newPrev;
						})
					}
					onReset={data => {
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0][index] = data;
							return newPrev;
						});
					}}
					onDelete={() => {
						setModal({
							title: 'Confirm Deletion',
							body: <p>Are you sure you want to delete?</p>,
							footer: (
								<div className={styles.deleteModalFooter}>
									<NormalButtonWithEffects
										className={`${styles.btn} ${styles.yesBtn}`}
										onClick={() => {
											setGameCards(prev => {
												const newPrev = cloneObject(prev);
												newPrev[0].splice(index, 1);
												return newPrev;
											});
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
					}}
				/>
			))}
			{!!gameCards[1] || (
				<NormalButtonWithEffects
					onClick={() =>
						setGameCards(prev => {
							const newPrev = cloneObject(prev);
							newPrev[0].push({ id: Date.now(), header: '', cards: [] });
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
