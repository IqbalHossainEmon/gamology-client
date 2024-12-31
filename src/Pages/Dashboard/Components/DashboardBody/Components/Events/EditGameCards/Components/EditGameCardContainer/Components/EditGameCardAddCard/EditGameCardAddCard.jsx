import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, margin, onClick }) {
	return (
		<li
			className={`${styles.addGameCard} hover-shadow`}
			style={{ width: `${width}px`, marginRight: `${margin}px` }}
		>
			<button type='button' onClick={onClick} className={styles.btn}>
				<div className={styles.plus} />
			</button>
		</li>
	);
}
export default EditGameCardAddCard;
